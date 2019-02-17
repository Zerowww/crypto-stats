import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { RestProvider } from '../providers/rest/rest';
import { CryptoCurrencyDetailPage } from '../pages/crypto-currency-detail/crypto-currency-detail';

// I just couldn't figure how to lazy load CryptoCurrencyDetailPage so I had to do it that way
// I know it isn't supposed to be this way..
@NgModule({
  declarations: [MyApp, CryptoCurrencyDetailPage],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, CryptoCurrencyDetailPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
  ],
})
export class AppModule {}
