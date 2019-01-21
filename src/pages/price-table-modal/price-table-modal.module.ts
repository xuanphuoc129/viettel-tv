import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceTableModalPage } from './price-table-modal';

@NgModule({
  declarations: [
    PriceTableModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PriceTableModalPage),
  ],
})
export class PriceTableModalPageModule {}
