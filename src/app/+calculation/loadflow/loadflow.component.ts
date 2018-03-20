import { ShowDataService } from 'app/services/show-data.service';
import { Component, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GridOptions } from "ag-grid/main";


@Component({    
    templateUrl: './loadflow.component.html'
})


export class LoadFlowComponent {
    public loadflow: LoadFlow[] = [];

    gridOptions: GridOptions;
    rowData: Object; //było any[]
    show: boolean;
   // showResult: boolean = false;
    
    constructor(public http: HttpClient, public showData: ShowDataService, @Inject('BASE_URL') baseUrl: string) {
      //  this.rowData = JSON.parse(localStorage.getItem('dane'));
        
        //this.showResult = false;
        //czy pokazywać dane czy nie w zależności od tego czy projekt jest otwarty
        this.showData.currentShow.subscribe(show => this.show = show);
        
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{
            onGridReady: () => {
                this.gridOptions.api.sizeColumnsToFit(); //make the currently visible columns fit the screen.
                // show 'no rows' overlay              
            },
           
            
        };
       

        this.gridOptions = {           
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
                    headerName: 'Load flow data',
                    children: [
                        
                        {
                            headerName: "Bus no.", field: "busNo", type: "numericColumn"                           
                        },
                        {
                            headerName: "Voltage [kV]", field: "resultU", type: "numericColumn",
                            
                        },
                        {
                            headerName: "Angle [degrees]", field: "resultSigma", type: "numericColumn",
                           
                        }
                        
                    ]
                }
            ],
            defaultColDef: {
                //enableCellChangeFlash: true,
                // set every column width
                width: 150,
                // make every column editable
                editable: false,
                // make every column use 'text' filter by default
                filter: 'text'
            },
        }

        
        /*
        http.get(baseUrl + 'api/LoadFlowController/LoadFlow').subscribe(result => {
            this.rowData = result.json(); //as LoadFlow[]
        }); */ 
        //, error => console.error(error)
    }

   
    executeLoadFlow(){
        this.http.get('api/LoadFlow/Get').subscribe(result => {

        
            this.rowData = result; //as LoadFlow[]
          //  localStorage.setItem('dane', JSON.stringify(result)); 
        }
        );

      //  this.showResult = true;

    }


}

interface LoadFlow {  
    busNo: number;
    resultU: number;
    resultSigma: number; 
}
