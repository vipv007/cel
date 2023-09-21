import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { WelcomeComponent } from './welcome.component';

import { HttpClientModule } from '@angular/common/http';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
@NgModule({
  imports: [WelcomeRoutingModule,NzTabsModule,HttpClientModule,CommonModule,NzTableModule,NzCardModule],
  declarations: [WelcomeComponent, ],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
