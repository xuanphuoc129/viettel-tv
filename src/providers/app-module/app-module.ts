import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app-config';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { StorageController } from '../storage';
import { EmailConfig } from '../email-config';
import { ScrollOption, ScrollController } from '../scroll-controller';
import { DistrictManager } from './District';
import { AlertController, ModalController } from 'ionic-angular';


declare var Email;

/*
  Generated class for the AppModuleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppModuleProvider {
  private mAppConfig: AppConfig;
  private mEmailConfig: EmailConfig = null;
  private mStorageController: StorageController;
  public mScrollController: ScrollController = new ScrollController();
  phone_number: string = "";

  private mDistrictManager : DistrictManager = null;

  constructor(
    public mModalController: ModalController,
    public mAlertController: AlertController,
    public mStorage: Storage,
    public http: Http) {
    this.mDistrictManager = new DistrictManager();
    this.mAppConfig = new AppConfig();
    this.mAppConfig = new AppConfig();
    this.mEmailConfig = new EmailConfig();
    this.mStorageController = new StorageController();
    this.mStorageController.setStorage(this.mStorage);
  }

  public onLoadDistrict(){
    this.onReadFileJson("./assets/data/tinh_tp.json").then((data)=>{
      if(data){
        this.getDistrictManager().onResponseCity(data["tinh_tp"]);
      }
    })
    this.onReadFileJson("./assets/data/quan_huyen.json").then((data)=>{
      if(data){
        this.getDistrictManager().onResponseDistrict(data["quan_huyen"]);
      }
    })
    this.onReadFileJson("./assets/data/xa_phuong.json").then((data)=>{
      if(data){
        this.getDistrictManager().onResponseCommunes(data["xa_phuong"]);
      }
    })
  }

  public showRadio(title: string, arrayInput: Array<{ id: any, name: string }>, idselected: any, callback: any) {
    let alert = this.mAlertController.create();
    alert.setTitle(title);
    arrayInput.forEach(element => {
      alert.addInput({
        type: 'radio',
        label: element.name,
        value: element.id + "",
        checked: element.id == idselected ? true : false
      })
    });
    alert.addButton({
      text: 'OK',
      handler: data => {

        callback(data);
      }
    });
    alert.present();
  }

  public showModal(page,params?:any,callback?:any){
    let modal = this.mModalController.create(page,params ? params : null);
    modal.present();
    modal.onDidDismiss(data=>{
      if(callback){
        callback(data);
      }
    })
  }

  public getDistrictManager(): DistrictManager{
    return this.mDistrictManager;
  }

  public getStorageController() {
    return this.mStorageController;
  }

  public getAppConfig() {
    return this.mAppConfig;
  }

  private getEmailConfig() {
    return this.mEmailConfig;
  }

  public onLoadChannelList(){
    return this.onReadFileJson("./assets/data/channel_list.json");
  }

  public onLoadNameCustomerFile() {
    return this.onReadFileJson("./assets/data/name_customer.json");
  }

  public onResponseConfig(data) {
    let email_config = {
      email_receive: "kunlyblack@gmail.com",
      email_sender: "cuahangviettel.vn@gmail.com",
      smtp_server: "smtp.gmail.com",
      username: "cuahangviettel.vn@gmail.com",
      password: "eknpglqnwzyydbur"
    }
    this.getEmailConfig().parseData(email_config);
    this.phone_number = this.getAppConfig().get("phone_number");
  }

  public onLoadConfig() {
    return new Promise((resolve, reject) => {
      if (this.mAppConfig.hasData()) resolve();
      this.onReadFileJson("./assets/data/data.json").then((data) => {
        if (data) {
          this.mAppConfig.onResponseConfig(data);
          this.onResponseConfig(data);
          resolve(this.mAppConfig);
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  public onReadFileJson(link: string) {
    return new Promise((resolve, reject) => {
      this.http.get(link).map(res => res.json()).subscribe(data => {
        if (data) {
          resolve(data);
        } else {
          reject();
        }
      });
    })
  }

  public doScrollLeft(id, left) {
    let option: ScrollOption = {
      callback: null,
      alpha: 0.4,
      epsilon: 1
    }
    this.mScrollController.doScrollLeft(id, left, option);
  }

  public sendEmail(body) {
    this.doCheckFiveMinutes().then((res) => {
      Email.send(this.mEmailConfig.email_sender,
        this.mEmailConfig.email_receive,
        "Đăng ký lắp mạng",
        body,
        this.mEmailConfig.smtp_server,
        this.mEmailConfig.username,
        this.mEmailConfig.password);
      let time = new Date();
      this.getStorageController().saveDataToStorage("time_send", time.getTime());
    }).catch(err => {

    })

  }

  doCheckFiveMinutes() {
    return new Promise((resolve, reject) => {
      this.getStorageController().getDataFromStorage("time_send").then((res) => {
        if (res) {
          let time = parseInt(res);
          let nowTime = new Date().getTime();
          let distance = nowTime - time;
          if (Math.floor(distance / 60000) < 3) {
            reject(false);
            alert("Vui lòng đăng ký lại sau ít phút hoặc liên hệ hotline " + this.phone_number + " để được hỗ trợ");
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
    })

  }

}
