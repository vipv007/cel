import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioPageRoutingModule } from './portfolio-routing.module';

import { PortfolioPage } from './portfolio.page';
import { RibbonComponent } from '../tab1/ribbon/ribbon.component';

import { BillPage } from '../bill/bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioPageRoutingModule
  ],
  declarations: [PortfolioPage ,RibbonComponent,BillPage]
})
export class PortfolioPageModule {}
