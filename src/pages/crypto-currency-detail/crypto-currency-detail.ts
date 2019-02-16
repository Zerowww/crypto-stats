import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-crypto-currency-detail',
  templateUrl: 'crypto-currency-detail.html',
})
export class CryptoCurrencyDetailPage {
  constructor(public _navCtrl: NavController, public _navParams: NavParams) {}

  ionViewDidLoad(): void {
    console.log('ionViewDidLoad CryptoCurrencyDetailPage');
  }

  public goBack(): void {
    this._navCtrl.pop();
  }
}
