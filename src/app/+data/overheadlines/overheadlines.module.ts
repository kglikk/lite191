import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OverheadLinesRoutingModule } from './overheadlines-routing.module';
import { OverheadLinesComponent } from "app/+data/overheadlines/overheadlines.component";
import {SmartadminModule} from "app/shared/smartadmin.module";

import {AgGridModule} from 'ag-grid-angular/main';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SmartadminModule,
    AgGridModule.withComponents([]),
    OverheadLinesRoutingModule
    
  ],
  declarations: [
    OverheadLinesComponent
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
  ] 
})
export class OverheadLinesModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
