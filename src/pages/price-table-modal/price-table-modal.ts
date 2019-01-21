import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';

/**
 * Generated class for the PriceTableModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export class TablePrices {
  service: string = "";
  package: string = "";
  price: string = "";
  price_sell: string = "";
  type: number = -1;
  constructor() { }

  parseData(data) {
    if (data) {
      if ("service" in data) this.service = data.service;
      if ("package" in data) this.package = data.package;
      if ("price" in data) this.price = data.price;
      if ("price_sell" in data) this.price_sell = data.price_sell;
      if ("type" in data) this.type = data.type;
    }
  }

}
@IonicPage()
@Component({
  selector: 'page-price-table-modal',
  templateUrl: 'price-table-modal.html',
})
export class PriceTableModalPage {

  mArrays1: Array<TablePrices> = [];
  mArrays2: Array<TablePrices> = [];


  constructor(
    public mAppModule: AppModuleProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.mAppModule.onLoadConfig().then(() => {
      this.onLoadConfigDone();
    })
  }

  onLoadConfigDone() {
    this.mArrays1 = [];
    this.mArrays2 = [];
    let data = this.mAppModule.getAppConfig().get("bang_gia_khuyen_mai");
    if(data){
      data.forEach(element => {
        let newObject = new TablePrices();
        newObject.parseData(element);
        if(newObject.type == 1){
          this.mArrays1.push(newObject);
        }else{
          this.mArrays2.push(newObject);
        }
      });
    }
  }

  ionViewDidLoad() {

  }

}
