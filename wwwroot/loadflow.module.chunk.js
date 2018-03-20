webpackJsonp(["loadflow.module"],{

/***/ "../../../../../src/app/+calculation/loadflow/loadflow-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadFlowRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_calculation_loadflow_loadflow_component__ = __webpack_require__("../../../../../src/app/+calculation/loadflow/loadflow.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const routes = [{
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2_app_calculation_loadflow_loadflow_component__["a" /* LoadFlowComponent */],
    }];
let LoadFlowRoutingModule = class LoadFlowRoutingModule {
};
LoadFlowRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], LoadFlowRoutingModule);



/***/ }),

/***/ "../../../../../src/app/+calculation/loadflow/loadflow.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- MAIN CONTENT -->\n\n  <div *ngIf=\"show;else othercontent\" id=\"content\">\n\n    <div class=\"row\">\n      <!-- <sa-big-breadcrumbs [items]=\"['Load Flow Calculation']\" icon=\"table\" class=\"col-xs-12 col-sm-7 col-md-7 col-lg-4\"></sa-big-breadcrumbs> -->\n      <sa-big-breadcrumbs [items]=\"['Load Flow Calculation']\" icon=\"table\" class=\"col-xs-12 col-sm-7 col-md-7 col-lg-4\"></sa-big-breadcrumbs>\n      <!-- <sa-stats></sa-stats> -->\n    </div>\n\n    <load-flow-parameters-form (change) = \"executeLoadFlow()\" ></load-flow-parameters-form>\n    \n    <!-- widget grid -->\n    <sa-widgets-grid>\n\n\n      <div class=\"row\">\n        <article class=\"col-sm-12\">\n          <div class=\"table-responsive\" style=\"width: 100%; height: 500px;\">\n            <ag-grid-angular #agGrid style=\"width: 100%;height: 100%;\" class=\"ag-fresh\" [gridOptions]=\"gridOptions\" [rowData]=\"rowData\">\n              <!--  [columnDefs]=\"columnDefs\" [defaultColDef]=\"defaultColDef\" -->\n            </ag-grid-angular>\n          </div>\n\n          <!--\n          <sa-widget [editbutton]=\"false\" color=\"darken\">\n            <header>\n              <span class=\"widget-icon\">\n                <i class=\"fa fa-table\"></i>\n              </span>\n\n              <h2>Load Flow results</h2>\n            </header>\n            <div>\n              <div class=\"widget-body no-padding\">\n                 <alert type=\"info\" class=\"no-margin fade in\" dismisser=\"\"> \n                <i class=\"fa-fw fa fa-info\"></i>\n                Adds zebra-striping to table row within <code>&lt;table&gt;</code> by adding the <code>.table-striped</code>\n                with the base class\n              </alert>\n           \n            \n\n              </div>\n            </div>\n          </sa-widget>\n           -->\n        </article>\n\n\n      </div>\n\n    </sa-widgets-grid>\n  </div>\n\n <ng-template #othercontent>Please open or create project in the Home tab first</ng-template>"

/***/ }),

/***/ "../../../../../src/app/+calculation/loadflow/loadflow.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadFlowComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_services_show_data_service__ = __webpack_require__("../../../../../src/app/services/show-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm2015/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



let LoadFlowComponent = class LoadFlowComponent {
    // showResult: boolean = false;
    constructor(http, showData, baseUrl) {
        //  this.rowData = JSON.parse(localStorage.getItem('dane'));
        this.http = http;
        this.showData = showData;
        this.loadflow = [];
        //this.showResult = false;
        //czy pokazywać dane czy nie w zależności od tego czy projekt jest otwarty
        this.showData.currentShow.subscribe(show => this.show = show);
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = {
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
        };
        /*
        http.get(baseUrl + 'api/LoadFlowController/LoadFlow').subscribe(result => {
            this.rowData = result.json(); //as LoadFlow[]
        }); */
        //, error => console.error(error)
    }
    executeLoadFlow() {
        this.http.get('api/LoadFlow/Get').subscribe(result => {
            this.rowData = result; //as LoadFlow[]
            //  localStorage.setItem('dane', JSON.stringify(result)); 
        });
        //  this.showResult = true;
    }
};
LoadFlowComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/+calculation/loadflow/loadflow.component.html")
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"])('BASE_URL')),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_0_app_services_show_data_service__["a" /* ShowDataService */], String])
], LoadFlowComponent);



/***/ }),

/***/ "../../../../../src/app/+calculation/loadflow/loadflow.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadFlowModule", function() { return LoadFlowModule; });
/* harmony export (immutable) */ __webpack_exports__["getBaseUrl"] = getBaseUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm2015/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loadflow_routing_module__ = __webpack_require__("../../../../../src/app/+calculation/loadflow/loadflow-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_calculation_loadflow_loadflow_component__ = __webpack_require__("../../../../../src/app/+calculation/loadflow/loadflow.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_shared_smartadmin_module__ = __webpack_require__("../../../../../src/app/shared/smartadmin.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_components_load_flow_parameters_form_load_flow_parameters_form_component__ = __webpack_require__("../../../../../src/app/components/load-flow-parameters-form/load-flow-parameters-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ag_grid_angular_main__ = __webpack_require__("../../../../ag-grid-angular/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ag_grid_angular_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ag_grid_angular_main__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("../../../forms/esm2015/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let LoadFlowModule = class LoadFlowModule {
};
LoadFlowModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_5_app_shared_smartadmin_module__["a" /* SmartadminModule */],
            __WEBPACK_IMPORTED_MODULE_7_ag_grid_angular_main__["AgGridModule"].withComponents([]),
            __WEBPACK_IMPORTED_MODULE_3__loadflow_routing_module__["a" /* LoadFlowRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["g" /* ReactiveFormsModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4_app_calculation_loadflow_loadflow_component__["a" /* LoadFlowComponent */],
            __WEBPACK_IMPORTED_MODULE_6_app_components_load_flow_parameters_form_load_flow_parameters_form_component__["a" /* LoadFlowParametersFormComponent */]
        ],
        providers: [
            { provide: 'BASE_URL', useFactory: getBaseUrl }
        ]
    })
], LoadFlowModule);

function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}


/***/ }),

/***/ "../../../../../src/app/components/load-flow-parameters-form/load-flow-parameters-form.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".box{\r\n    border: solid 1px #000;\r\n    padding: 10px;\r\n    text-align:center;\r\n  }\r\n\r\n  \r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/load-flow-parameters-form/load-flow-parameters-form.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" class=\"btn btn-primary\" (click)=\"openModal(template)\" style=\"margin-top: 10px; margin-bottom: 10px\">\n  Calculate</button>\n\n<ng-template #template>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">Load Flow Parameters</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n\n    <div class=\"bs-example\">\n      <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n          <a data-toggle=\"tab\" href=\"#sectionA\">Basic Description</a>\n        </li>\n\n        <li class=\"dropdown\">\n          <a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\">Iteration control\n            <b class=\"caret\"></b>\n          </a>\n          <ul class=\"dropdown-menu\">\n            <li>\n              <a data-toggle=\"tab\" href=\"#dropdown1\">Max. number of iterations for:</a>\n            </li>\n            <li>\n              <a data-toggle=\"tab\" href=\"#dropdown2\">Max. acceptable load flow error for:</a>\n            </li>\n          </ul>\n        </li>\n      </ul>\n\n\n      <div class=\"tab-content\">\n        <div id=\"sectionA\" class=\"tab-pane fade in active\">\n          <p>AC Load Flow, balanced, positive sequence</p>\n          <p>Newton-Raphson method</p>\n        </div>\n        <div id=\"dropdown1\" class=\"tab-pane fade\">\n          <h3>Max. number of iterations for:</h3>\n          <form [formGroup]=\"form\" (ngSubmit)=\"saveAndExecute()\" class=\"form-horizontal\">\n            <div *ngIf=\"form.errors\" class=\"alert alert-danger\">At least one input parameter is invalid </div>\n\n            <div formGroupName=\"iteration\">\n              <div class=\"form-group\">\n                <label for=\"iterNR\">Newton-Raphson iteration:</label>\n                <input formControlName=\"iterNR\" type=\"text\" class=\"form-control\" id=\"iterNR\">\n                <div *ngIf=\"iterNR.touched && iterNR.invalid\" class=\"alert alert-danger\">It is required</div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"outIter\">Outer loop</label>\n                <input formControlName=\"outIter\" type=\"text\" class=\"form-control\" id=\"outIter\">\n                <div *ngIf=\"outIter.touched && outIter.invalid\" class=\"alert alert-danger\">It is required</div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"steps\">Number of steps</label>\n                <input type=\"text\" class=\"form-control\" id=\"steps\" value=\"1\">\n              </div>\n            </div>\n            <!--\n            <button type=\"submit\" class=\"btn btn-default\">Execute</button>\n            -->\n          </form>\n        </div>\n        <div id=\"dropdown2\" class=\"tab-pane fade\">\n          <h2>Max. acceptable load flow error for:</h2>\n          <form class=\"form-horizontal\">\n\n\n            <div class=\"form-group\">\n              <label for=\"errNodes\">Nodes</label>\n              <input type=\"text\" class=\"form-control\" id=\"errNodes\" value=\"1\">\n            </div>\n            <div class=\"form-group\">\n              <label for=\"errorModelEquations\">Model Equations [kVA]</label>\n              <input type=\"text\" class=\"form-control\" id=\"errorModelEquations\" value=\"0,1\">\n\n            </div>\n            <!--<button type=\"submit\" class=\"btn btn-default\">Submit</button>-->\n          </form>\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"modalRef.hide()\">Close</button>\n    <button type=\"submit\" class=\"btn btn-primary\" (click)=\"saveAndExecute()\">Execute</button>\n   \n  </div>\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/components/load-flow-parameters-form/load-flow-parameters-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadFlowParametersFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("../../../forms/esm2015/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_show_data_service__ = __webpack_require__("../../../../../src/app/services/show-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_project_service__ = __webpack_require__("../../../../../src/app/services/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_auth_auth_service__ = __webpack_require__("../../../../../src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("../../../common/esm2015/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let LoadFlowParametersFormComponent = class LoadFlowParametersFormComponent {
    constructor(http, projectService, auth, modalService, showData) {
        this.http = http;
        this.projectService = projectService;
        this.auth = auth;
        this.modalService = modalService;
        this.showData = showData;
        this.change = new __WEBPACK_IMPORTED_MODULE_3__angular_core__["EventEmitter"]();
        this.deletedProject = {};
        this.selectedProject = [];
        this.headers = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
        this.form = new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormGroup */]({
            iteration: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormGroup */]({
                iterNR: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormControl */]('25', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["h" /* Validators */].required]),
                outIter: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormControl */]('20', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["h" /* Validators */].required)
            })
        });
    }
    get iterNR() {
        return this.form.get('iteration.iterNR');
    }
    get outIter() {
        return this.form.get('iteration.outIter');
    }
    ngOnInit() {
    }
    saveAndExecute() {
        this.form.setErrors({
            invalidLogin: true
        });
        //wykonaj Execute z loadflow.component
        this.change.emit();
        //schowaj ramke
        this.modalRef.hide();
    }
    openModal(template) {
        this.modalRef = this.modalService.show(template);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Output"])(),
    __metadata("design:type", Object)
], LoadFlowParametersFormComponent.prototype, "change", void 0);
LoadFlowParametersFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
        selector: 'load-flow-parameters-form',
        template: __webpack_require__("../../../../../src/app/components/load-flow-parameters-form/load-flow-parameters-form.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/load-flow-parameters-form/load-flow-parameters-form.component.css")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__services_project_service__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_4_app_services_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["a" /* BsModalService */], __WEBPACK_IMPORTED_MODULE_1__services_show_data_service__["a" /* ShowDataService */]])
], LoadFlowParametersFormComponent);



/***/ })

});
//# sourceMappingURL=loadflow.module.chunk.js.map