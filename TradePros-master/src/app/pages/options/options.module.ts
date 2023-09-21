import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options/options.component';




import { NzTableModule } from 'ng-zorro-antd/table';


import { HttpClientModule } from '@angular/common/http';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { NzCardModule } from 'ng-zorro-antd/card';
@NgModule({
  declarations: [
    OptionsComponent
  ],
  imports: [
    CommonModule,
    OptionsRoutingModule,
    NzTableModule,
    NzTabsModule,
    NzCardModule,
    HttpClientModule
  ]
})
export class OptionsModule { }
