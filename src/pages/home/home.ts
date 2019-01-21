import { Component, ViewChild } from '@angular/core';
import { NavController, Content, ModalController, Select, Platform, AlertController } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { ScrollItems } from '../../providers/scroll-controller';
import { Utils } from '../../providers/util';
import { Citys, Districts, Communes } from '../../providers/app-module/District';

export class Packages {
  id: number = -1;
  name: string = "";
  constructor() { }
  parse(data) {
    if (data) {
      if ("id" in data) this.id = data.id;
      if ("name" in data) this.name = data.name;
    }
  }
}

export class Services {
  id: number = -1;
  name: string = "";
  des: string = "";
  mobile_show: string = "";

  constructor() { }
  parse(data) {
    if (data) {
      if ("id" in data) this.id = data.id;
      if ("name" in data) this.name = data.name;
      if ("des" in data) this.des = data.des;
      if ("mobile_show" in data) this.mobile_show = data.mobile_show;
    }
  }
}

export class PriceTables {
  name: string = "";
  internet: string = "";
  combo_flexi: string = "";
  combo_sport: string = "";

  constructor() {

  }

  parseData(data) {
    if (data) {
      if ("name" in data) this.name = data.name;
      if ("internet" in data) this.internet = data.internet;
      if ("combo_flexi" in data) this.combo_flexi = data.combo_flexi;
      if ("combo_sport" in data) this.combo_sport = data.combo_sport;
    }
  }
}

export class DiscountTable {
  type_connect: string = "";
  discount: string = "";
  level: string = "";

  constructor() { }

  parseData(data) {
    if (data) {
      if ("type_connect" in data) this.type_connect = data.type_connect;
      if ("discount" in data) this.discount = data.discount;
      if ("level" in data) this.level = data.level;
    }
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) myContent: Content;

  _currentIndex: number = 0;
  _mScrollItem: ScrollItems = null;
  _mPackageId: number = -1;
  _mServiceId: number = -1;
  name: string = "";
  phone: string = "";
  address: string = "";

  _phone1: string = "0962018555";
  _phone2: string = "0971519555";
  _phone3: string = "0865124000";

  _cityCode: string = "-1";
  _DistricCode: string = "-1";
  _CommuneCode: string = "-1";

  cityName: string = "";
  districtName: string = "";
  communeName: string = "";
  packageName: string = "";
  serviceName: string = "";

  mPackages: Array<Packages> = [];
  mServices: Array<Services> = [];
  mState: Array<boolean> = [true, true, true, true];
  mHeaders: Array<{ name: string, des: string, mobile_show: string }> = [];
  mPriceTables: Array<PriceTables> = [];
  mDiscountsLevel1: Array<DiscountTable> = [];
  mDiscountsLevel2: Array<DiscountTable> = [];

  mCitys: Array<Citys> = [];
  mDistricts: Array<Districts> = [];
  mCommunes: Array<Communes> = [];

  dmm: string = "";

  isIosMobile: boolean = false;

  constructor(
    public mAlertControll: AlertController,
    public platForm: Platform,
    public mModal: ModalController,
    public mAppModule: AppModuleProvider,
    public navCtrl: NavController) {
    this.mAppModule.onLoadDistrict();

    this.mAppModule.onLoadConfig().then(() => {
      this.onLoadConfigDone();
    })

    this.platForm.ready().then(() => {
      if (this.platForm.is('ios')) {
        this.isIosMobile = true;
      }
    })

  }

  onClickShowInputName() {
    let mlert = this.mAlertControll.create({
      title: "Nhập họ và tên",
      inputs: [
        {
          placeholder: "Họ và tên đầy đủ của bạn",
          type: "text",
          name: "name",
          value: this.name
        }
      ],
      buttons: [
        {
          text: "Ok",
          handler: (data: any) => {
            this.name = data.name;
          }
        }
      ]
    });
    mlert.present();
  }

  onClickShowInputPhone() {
    let mlert = this.mAlertControll.create({
      title: "Số điện thoại",
      inputs: [
        {
          placeholder: "Số điện thoại liên hệ",
          type: "number",
          name: "phone",
          value: this.phone
        }
      ],
      buttons: [
        {
          text: "Ok",
          handler: (data: any) => {
            this.phone = data.phone;
          }
        }
      ]
    });
    mlert.present();
  }

  onClickShowInputAddress(){
    let mlert = this.mAlertControll.create({
      title: "Địa chỉ",
      inputs: [
        {
          placeholder: "Số nhà, tên đường, tổ/thôn",
          type: "text",
          name: "address",
          value: this.address
        }
      ],
      buttons: [
        {
          text: "Ok",
          handler: (data: any) => {
            this.address = data.address;
          }
        }
      ]
    });
    mlert.present();
  }

  onClickChannel() {
    let modal = this.mModal.create("ChannelListPage");
    modal.present();
  }

  onShowModal() {
    let modal = this.mModal.create("PriceTableModalPage");
    modal.present();
  }

  onLoadConfigDone() {
    this.onLoadPackage();
    this.onLoadService();
    this.onLoadPriceTables();
    this.onLoadDiscounts();
    this._phone1 = this.mAppModule.getAppConfig().get("hotline1");
    this._phone2 = this.mAppModule.getAppConfig().get("hotline2");
    this._phone3 = this.mAppModule.getAppConfig().get("hotline3");
    this.mState = [true, true, true, true];
  }

  onLoadDiscounts() {
    this.mDiscountsLevel1 = [];
    this.mDiscountsLevel2 = [];
    let data = this.mAppModule.getAppConfig().get("uu_dai");
    data.forEach(element => {
      let newDiscount = new DiscountTable();
      newDiscount.parseData(element);
      if (newDiscount.level == "Mức 1") {
        this.mDiscountsLevel1.push(newDiscount);
      } else {
        this.mDiscountsLevel2.push(newDiscount);
      }
    });
  }


  onLoadPriceTables() {
    this.mPriceTables = [];
    let data = this.mAppModule.getAppConfig().get("danh_sach_bang_gia");
    data.forEach(element => {
      let newPackage = new PriceTables();
      newPackage.parseData(element);
      this.mPriceTables.push(newPackage);
    });
  }

  onLoadPackage() {
    this.mPackages = [];
    let data = this.mAppModule.getAppConfig().get("goi_cuoc");
    if (data) {
      this._mPackageId = -1;
      data.forEach(element => {
        let p = new Packages();
        p.parse(element);
        this.mPackages.push(p);
      });

    }
  }

  onLoadService() {
    this.mServices = [];
    let data = this.mAppModule.getAppConfig().get("dich_vu");
    if (data) {
      this._mServiceId = -1;
      data.forEach(element => {
        let p = new Services();
        p.parse(element);
        this.mServices.push(p);
        this.mHeaders.push({
          name: p.name,
          des: p.des,
          mobile_show: p.mobile_show
        });
      });
    }

    this.mHeaders.unshift({
      name: "Tên gói cước",
      des: "",
      mobile_show: "Gói cước"
    });


  }

  ionViewDidLoad() {
    this._mScrollItem = new ScrollItems("slideId");
    setTimeout(() => {
      this.mCitys = this.mAppModule.getDistrictManager().getCitys();
    }, 2000);

  }

  onClickOrderNow() {
    let ele = document.getElementById("register-id");
    if (ele) {
      this.myContent.scrollTo(0, ele.offsetTop, 500);
    }
  }

  onSwipe(e) {
    let direction = e.direction;
    let left = 0;

    if (direction == 2) {
      if (this._currentIndex < 2) {
        this._currentIndex++;
        left = this._mScrollItem.mItemWidth * this._currentIndex;
      } else {
        return;
      }
    } else if (direction == 4) {
      if (this._currentIndex > 0) {
        this._currentIndex--;
        left = this._mScrollItem.mItemWidth * this._currentIndex;
      } else {
        return;
      }
    }

    this.mAppModule.doScrollLeft("slideId", left);
    this.mAppModule.doScrollLeft("slideId1", left);
  }

  onClickRegister() {
    let check = true;
    if (this.name.trim() == '') {
      this.mState[0] = false;
      check = false;
    }
    if (this.phone.trim() == '' || !Utils.isValidPhone(this.phone)) {
      this.mState[1] = false;
      check = false;
    }
    if (this._mPackageId == -1) {
      this.mState[2] = false;
      check = false;
    }
    if (this._mServiceId == -1) {
      this.mState[3] = false;
      check = false;
    }

    if (!check) return;

    let body = this.createBody();
    this.mAppModule.sendEmail(body);

    alert("Cảm ơn bạn đã đăng ký! Nhân viên Viettel sẽ liên hệ lại sớm nhất với bạn");

    this.clearForm();
  }

  createBody() {
    let str1 = "Họ tên: " + this.name;
    let str2 = "Số điện thoại: " + this.phone;

    let str3 = "Địa chỉ: " + this.address;

    let str6 = this.communeName + ", " + this.districtName + ", " + this.cityName;

    let p = this.mPackages.find(ele => {
      return ele.id == this._mPackageId;
    })
    let str4 = "Gói cước: " + p.name;

    let s = this.mServices.find(ele => {
      return ele.id == this._mServiceId;
    })
    let str5 = "Hình thức dịch vụ: " + s.name;

    return str1 + "; " + str2 + "; " + str3 + str6 + "; " + str4 + "; " + str5;
  }

  clearForm() {
    this.name = "";
    this.phone = "";
    this.address = "";
    this._mPackageId = -1;
    this._mServiceId = -1;
    this._cityCode = "-1";
    this.cityName = "";
    this._DistricCode = "-1";
    this.districtName = "";
    this._CommuneCode = "-1";
    this.communeName = "";
    this._mPackageId = -1;
    this.packageName = "";
    this._mServiceId = -1;
    this.serviceName = "";
  }

  onClickCity() {
    let array = [];
    this.mCitys.forEach(element => {
      array.push({
        id: element.code,
        name: element.name
      });
    });
    this.mAppModule.showRadio("Chọn tỉnh/thành phố", array, this._cityCode, (id) => {
      if (id) {
        if (id != this._cityCode) {
          this._DistricCode = "-1";
          this.districtName = "";
          this._CommuneCode = "-1";
          this.communeName = "";
          this._mPackageId = -1;
          this.packageName = "";

          this._cityCode = id;
          this.onGetCityName();
          this.mDistricts = this.mAppModule.getDistrictManager().getDistrictWithCityCode(this._cityCode);
        }
      }
    })
  }

  onGetCityName() {
    let city = this.mCitys.find(ele => {
      return ele.code == this._cityCode;
    })

    if (city) {
      this.cityName = city.name;
    }
  }
  onGetDisctrictName() {
    let city = this.mDistricts.find(ele => {
      return ele.code == this._DistricCode;
    })

    if (city) {
      this.districtName = city.name;
    }
  }
  onGetCommuneName() {
    let city = this.mCommunes.find(ele => {
      return ele.code == this._CommuneCode;
    })

    if (city) {
      this.communeName = city.name;
    }
  }
  onGetPackageName() {
    let city = this.mPackages.find(ele => {
      return ele.id == this._mPackageId;
    })

    if (city) {
      this.packageName = city.name;
    }
  }
  onGetServiceName() {
    let city = this.mServices.find(ele => {
      return ele.id == this._mServiceId;
    })

    if (city) {
      this.serviceName = city.name;
    }
  }


  onClickDistrict() {
    if (this._cityCode == "-1") {
      alert("Bạn chưa chọn tỉnh/thành phố");
      return;
    }
    let array = [];
    this.mDistricts.forEach(element => {
      array.push({
        id: element.code,
        name: element.name
      });
    });
    this.mAppModule.showRadio("Chọn quận huyện", array, this._DistricCode, (id) => {
      if (id) {
        if (id != this._DistricCode) {
          this._CommuneCode = "-1";
          this.communeName = "";
          this._mPackageId = -1;
          this.packageName = "";

          this._DistricCode = id;
          this.onGetDisctrictName();
          this.mCommunes = this.mAppModule.getDistrictManager().getDistrictWithDistrictCode(this._DistricCode);
        }
      }
    })

  }

  onClickCommune() {
    if (this._DistricCode == "-1") {
      alert("Bạn chưa chọn quận huyện");
      return;
    }
    let array = [];
    this.mCommunes.forEach(element => {
      array.push({
        id: element.code,
        name: element.name
      });
    });
    this.mAppModule.showRadio("Chọn phường xã", array, this._CommuneCode, (id) => {
      if (id) {
        this._CommuneCode = id;
        this.onGetCommuneName();
      }
    })
  }

  onClickPackage() {
    if (this._DistricCode == "-1" || this._cityCode == "-1" || this._CommuneCode == "-1") {
      alert("Bạn chưa chọn địa chỉ");
      return;
    }
    let array = [];
    let district = this.mDistricts.find(ele => {
      return ele.code == this._DistricCode;
    })

    if (district && (district.cap == "Quận" || district.cap == "Thành phố")) {
      this.mPackages.forEach(element => {
        if (element.id > 2) {
          array.push({
            id: element.id,
            name: element.name
          });
        }
      });
    } else {
      this.mPackages.forEach(element => {
        array.push({
          id: element.id,
          name: element.name
        });
      });
    }
    this.mAppModule.showRadio("Chọn gói cước", array, this._CommuneCode, (id) => {
      if (id) {
        this._mPackageId = id;
        this.onGetPackageName();
      }
    })
  }

  onClickService() {
    let array = [];

    this.mServices.forEach(element => {
      array.push({
        id: element.id,
        name: element.name
      });
    });

    this.mAppModule.showRadio("Chọn hình thức dịch vụ", array, this._mServiceId, (id) => {
      if (id) {
        this._mServiceId = id;
        this.onGetServiceName();
      }
    })
  }


}
