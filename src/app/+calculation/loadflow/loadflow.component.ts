import { ShowDataService } from 'app/services/show-data.service';
import { Component, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GridOptions } from "ag-grid/main";

import * as XLSX from 'xlsx';


@Component({
    templateUrl: './loadflow.component.html',
    styleUrls: ['./loadflow.component.css']
})


export class LoadFlowComponent {
    public loadflow: LoadFlow[] = [];

    gridOptionsBusbars: GridOptions;
    gridOptionsBranches: GridOptions;
    rowDataBusbars: any; //było any[]
    rowDataBranches: any; //było any[]
    show: boolean;
    showButton: boolean; 

    
    // showResult: boolean = false;

    constructor(public http: HttpClient, public showData: ShowDataService, @Inject('BASE_URL') baseUrl: string) {
        //  this.rowData = JSON.parse(localStorage.getItem('dane'));
        this.showButton = false;
        //this.showResult = false;
        //czy pokazywać dane czy nie w zależności od tego czy projekt jest otwarty
        this.showData.currentShow.subscribe(show => this.show = show);

        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptionsBusbars = <GridOptions>{
            onGridReady: () => {
                this.gridOptionsBusbars.api.sizeColumnsToFit(); //make the currently visible columns fit the screen.
                // show 'no rows' overlay              
            },
        };

        this.gridOptionsBranches = <GridOptions>{
            onGridReady: () => {
                this.gridOptionsBranches.api.sizeColumnsToFit(); //make the currently visible columns fit the screen.
                // show 'no rows' overlay              
            },
        };

        this.gridOptionsBusbars = {
            // singleClickEdit: false,
            stopEditingWhenGridLosesFocus: true,
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please click "Calculate" button to see results </span>',
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,

            animateRows: true,
            rowSelection: 'multiple',
            columnDefs: [
                // put the three columns into a group
                {
                    headerName: 'Results - busbars',
                    groupId: "LF_Busbars",
                    children: [

                        {
                            headerName: "Bus no.", field: "busNo", type: "numericColumn"
                        },
                        {
                            headerName: "Voltage [kV]", field: "resultU", type: "numericColumn",  valueFormatter: this.numberFormatter  
                             /*,  valueParser: this.numberParser */
                        },
                        {
                            headerName: "Voltage [pu]", field: "resultUpu", type: "numericColumn",  valueFormatter: this.numberFormatter,  

                            cellStyle: function(params) {
                                if (params.value > '0.95' && params.value < '1.05' ) {                                    
                                    return { backgroundColor: 'lightgreen'};
                                } 
                                if ((params.value > '0.9' && params.value <= '0.95') || (params.value >= '1.05' && params.value < '1.1') ) {                                    
                                    return { backgroundColor: 'lightsalmon'};
                                } 
                                if (params.value <= '0.9' || params.value >= '1.1') {                                    
                                    return { backgroundColor: 'lightcoral'};
                                }                                
                            }                           
                          
                        },
                        {
                            headerName: "Angle [degrees]", field: "resultSigma", type: "numericColumn", valueFormatter: this.numberFormatter 
                        },

                    ]
                },               
            ],   
        }       

        this.gridOptionsBranches = {
            // singleClickEdit: false,
            stopEditingWhenGridLosesFocus: true,
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please click "Calculate" button to see results </span>',
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,

            animateRows: true,
            rowSelection: 'multiple',
            columnDefs: [
                // put the three columns into a group                               
                {
                    headerName: 'Results - branch elements',
                    groupId: "LF_Branches",
                    children: [
                        {
                            headerName: "Start bus number", field: "busNoStart", type: "numericColumn", columnGroupShow: 'open'
                        },
                        {
                            headerName: "End bus number", field: "busNoEnd", type: "numericColumn", columnGroupShow: 'open'
                        },
                        {
                            headerName: "Active power loss [kW]", field: "resultPloss", type: "numericColumn", columnGroupShow: 'open',  valueFormatter: this.numberFormatter 
                        },
                        {
                            headerName: "Reactive power loss [MVar]", field: "resultQloss", type: "numericColumn", columnGroupShow: 'open',  valueFormatter: this.numberFormatter 
                        },
                        {
                            headerName: "Current Iij [kA]", field: "resultIload_i", /*width: 100,*/ type: "numericColumn", columnGroupShow: 'open', valueFormatter: this.numberFormatter
                        },
                        {
                            headerName: "Current Iji [kA]", field: "resultIload_j", /*width: 100,*/ type: "numericColumn", columnGroupShow: 'open', valueFormatter: this.numberFormatter 
                        },
                    ]
                }
            ],   
        }      
    }



    numberFormatter(params) {

        var result: number;

        //w przypadku bardzo małych liczb wyświetla wartość 0 
        if(params.value > -0.00000000001 && params.value < 0.00000000001 ){
            result = 0;
            return result.toFixed(3);
            
        }
        else{
            return params.value.toFixed(3); //zaokragla do trzeciej liczby po przecinku
            /*
            Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            */
        }
        
    
      }
      /*
    formatNumber(number) {
        return Math.floor(number)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } */
    
    /*
   numberParser(params) { 
        return Number(params.newValue);
      }*/

    

    executeLoadFlow() {
        this.http.get('api/LoadFlow/Get').subscribe(result => {
            this.rowDataBusbars = result; //as LoadFlow[]
            this.rowDataBranches = result;
            this.showButton = true;
          //  localStorage.setItem('dane', JSON.stringify(result)); 
        }
        );

        //  this.showResult = true;

    }

    export(): void {
        //zbierz dane z serwera i zapisz do pliku xlsx
   
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowDataBusbars);
    
          // generate workbook and add the worksheet 
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
          /* save to file */
          //XLSX.writeFile(wb, 'externalgrid_'+this.projectName+'.xlsx');
          XLSX.writeFile(wb, 'bus_results_.xlsx');//' + this.projectName + '.xlsx');

          const wsheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowDataBranches);
    
          // generate workbook and add the worksheet 
          const wbook: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet2');
    
          /* save to file */
          //XLSX.writeFile(wb, 'externalgrid_'+this.projectName+'.xlsx');
          XLSX.writeFile(wb, 'branch_results_.xlsx');//' + this.projectName + '.xlsx');
       }


}

interface LoadFlow {
    busNo: number;
    resultU: number;
    resultUpu: number;
    resultSigma: number;

    busNoStart: number;
    busNoEnd: number;
    resultPloss: number;
    resultQloss: number;
    resultIload_i: number;
    resultIload_j: number;
}
