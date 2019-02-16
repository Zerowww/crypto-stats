import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CryptoCurrency } from '../../models/cryptoCurrency.model';
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

  public getToplistCryptoCurrencies() {
    this._rest.getToplistCryptoCurrencies().subscribe(
      (response: string[]) => {
        const data = response['Data'];

        data.forEach(data => {
          const cryptoCurrency: CryptoCurrency = {
            id: data['CoinInfo']['Id'],
            name: data['CoinInfo']['Name'],
            fullname: data['CoinInfo']['FullName'],
            imgPath: `/src/assets/imgs/cryptoCurrencies/${
              data['CoinInfo']['Name']
            }.png`,
            price: data['DISPLAY']['USD']['PRICE'],
            lastUpdated: data['DISPLAY']['USD']['LASTUPDATE'],
          };
          console.log(data);
          this.cryptoCurrencies.push(cryptoCurrency);
        });
      },
      error => console.error(error)
    );
  }
}
