import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';

/**
 * Generated class for the ChannelListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export class ChannelList{
  tt: string = "";
  tt_stb: string = "";
  source: string = "";
  type: string = "";
  agency: string = "";
  new_channel: string = "";
  signal: string = "";
  tstv: string = "";
  tvod: string = "";
  npvr: string =  "";
  note: string =  "";
  constructor(){}

  parse(data) {
    if (data) {
      if ("tt" in data) this.tt = data.tt;
      if ("tt_stb" in data) this.tt_stb = data.tt_stb;
      if ("source" in data) this.source = data.source;
      if ("type" in data) this.type = data.type;
      if ("agency" in data) this.agency = data.agency;
      if ("new_channel" in data) this.new_channel = data.new_channel;
      if ("signal" in data) this.signal = data.signal;
      if ("tstv" in data) this.tstv = data.tstv;
      if ("tvod" in data) this.tvod = data.tvod;
      if ("npvr" in data) this.npvr = data.npvr;
      if ("note" in data) this.note = data.note;
    }
  }
}
@IonicPage()
@Component({
  selector: 'page-channel-list',
  templateUrl: 'channel-list.html',
})
export class ChannelListPage {

  mChannelLists1: Array<ChannelList> = [];
  mChannelLists2: Array<ChannelList> = [];
  _type: number = 1;

  constructor(
    public mAppModule: AppModuleProvider,
    public navCtrl: NavController, public navParams: NavParams) {
      this.mAppModule.onLoadChannelList().then((data)=>{
        this.onLoadChannel(data);
      })
  }

  onClickType(type){
    this._type = type;
  }

  onLoadChannel(data){
    this.mChannelLists1 = [];
    this.mChannelLists2 = [];
    let flexi = data.flexi;
    let sport = data.sport;

    if(flexi){
      flexi.forEach(element => {
        let nChannelList = new ChannelList();
        nChannelList.parse(element);
        this.mChannelLists1.push(nChannelList);
      });
    }
    
    if(sport){
      sport.forEach(element => {
        let nChannelList = new ChannelList();
        nChannelList.parse(element);
        this.mChannelLists2.push(nChannelList);
      });
    }
  }

  ionViewDidLoad() {
   
  }

}
