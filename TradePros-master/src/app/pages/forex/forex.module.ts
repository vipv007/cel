import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForexRoutingModule } from './forex-routing.module';
import { ForexComponent } from './forex/forex.component';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClientModule } from '@angular/common/http';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { NzCardModule } from 'ng-zorro-antd/card';
import { FchartComponent } from './fchart/fchart.component';

@NgModule({
  declarations: [
    ForexComponent,
    FchartComponent
  ],
  imports: [
    CommonModule,
    ForexRoutingModule,
    NzCardModule,
    NzTableModule,
    NzTabsModule,
    HttpClientModule,
    NzButtonModule
  ]
})
export class ForexModule { }
