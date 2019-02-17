import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { CryptoCurrencyDetailPage } from './crypto-currency-detail';

@NgModule({
  declarations: [CryptoCurrencyDetailPage],
  imports: [IonicPageModule.forChild(CryptoCurrencyDetailPage)],
  entryComponents: [CryptoCurrencyDetailPage],
})
export class CryptoCurrencyDetailPageModule {}
