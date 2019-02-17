import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CryptoCurrency } from '../../models/cryptoCurrency.model';
import { CryptoCurrencyDetailPage } from '../crypto-currency-detail/crypto-currency-detail';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public countries: string[];
  public cryptoCurrencies: CryptoCurrency[] = [];

  constructor(public _navCtrl: NavController, public _rest: RestProvider) {}

  public ionViewDidLoad() {
    this.getToplistCryptoCurrencies();
  }

  public getToplistCryptoCurrencies(): void {
    this._rest.getToplistCryptoCurrencies().subscribe(
      (response: string[]) => {
        const data = response['Data'];

        data.forEach(data => {
          const cryptoCurrency: CryptoCurrency = {
            id: data['CoinInfo']['Id'],
            name: data['CoinInfo']['Name'],
            fullname: data['CoinInfo']['FullName'],
            imgPath: `./../../assets/imgs/cryptoCurrencies/${
              data['CoinInfo']['Name']
            }.svg`,
            price: data['DISPLAY']['USD']['PRICE'],
            lastUpdated: data['DISPLAY']['USD']['LASTUPDATE'],
          };
          this.cryptoCurrencies.push(cryptoCurrency);
        });
      },
      error => console.error(error)
    );
  }

  public goToCryptoCurrencyDetail(cryptoCurrency: CryptoCurrency): void {
    console.log(cryptoCurrency);
    this._navCtrl.push(CryptoCurrencyDetailPage, { name: cryptoCurrency.name });
  }
}
