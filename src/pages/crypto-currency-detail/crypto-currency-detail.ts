import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Subscription } from 'rxjs/Subscription';
import Chart from 'chart.js';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-crypto-currency-detail',
  templateUrl: 'crypto-currency-detail.html',
})
export class CryptoCurrencyDetailPage {
  // Crypto trigram required for requests
  public activeCryptoCurrencyName: string;

  // Crypto price evolution chart related
  @ViewChild('dailyBarCanvas')
  public dailyBarCanvas: ElementRef;
  public dailyBarChart: any;
  public subDailyData: Subscription;
  public dailyData: string[];

  // Crypto price chart related
  @ViewChild('dailyDoughnutCanvas')
  public dailyDoughnutCanvas: ElementRef;
  public dailyDoughnutChart: any;
  public subPriceData: Subscription;
  public priceData: string[];

  constructor(
    public _navCtrl: NavController,
    public _navParams: NavParams,
    public _rest: RestProvider
  ) {
    this._navParams.get('name')
      ? (this.activeCryptoCurrencyName = this._navParams.get('name'))
      : 'Crypto Stats';
  }

  public ionViewDidLoad(): void {
    this._initDailyData().then(() => {
      this._initDailyCharts();
    });

    this._initPriceData().then(() => {
      this._initPriceCharts();
    });
  }

  public ionViewWillLeave(): void {
    this.subDailyData.unsubscribe();
    this.subPriceData.unsubscribe();
  }

  /*
   *
   * INIT
   *
   */

  private _initDailyCharts(): void {
    const dailyChartLabels = this.dailyData.map(data => {
      return new DatePipe('en-En').transform(
        new Date(data['time']),
        'shortTime'
      );
    });

    const dailyChartData = this.dailyData.map(data => {
      return +data['close'];
    });

    console.log(dailyChartData);
    console.log(this.dailyData);

    console.log(new Date(this.dailyData[0]['time']));
    this.dailyBarChart = new Chart(this.dailyBarCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: dailyChartLabels,
        datasets: [
          {
            label: this.activeCryptoCurrencyName,
            backgroundColor: 'rgba(218 ,165 ,32 ,0.2)',
            borderColor: 'rgba(218 ,165 ,32 , 0)',
            borderWidth: 1,
            data: dailyChartData,
          },
        ],
      },
    });
  }

  private _initDailyData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.subDailyData = this._rest
        .getDailyHistoricalCryptoCurrency(this.activeCryptoCurrencyName)
        .subscribe((data: string[]) => {
          this.dailyData = data['Data'];

          if (this.dailyData) {
            resolve();
          } else {
            reject(() =>
              console.error(`this.dailyData undefined ${this.dailyData}`)
            );
          }
        });
    });
  }

  private _initPriceCharts(): void {
    const priceChartLabels = Object.keys(this.priceData);

    // I could use Object.values() but it isn't supported in this project
    const priceChartData = Object.keys(this.priceData).map(i =>
      Math.round(this.priceData[i])
    );

    console.log(priceChartLabels);
    console.log(priceChartData);

    console.log(this.priceData);
    this.dailyBarChart = new Chart(this.dailyDoughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: priceChartData,
            backgroundColor: [
              'rgba(218 ,165 ,32 ,0.6)',
              'rgba(218 ,165 ,32 ,0.9)',
              'rgba(218 ,165 ,32 ,0.2)',
            ],
            label: `${this.activeCryptoCurrencyName} value`,
          },
        ],
        labels: priceChartLabels,
      },
    });
  }

  private _initPriceData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.subPriceData = this._rest
        .getCryptoCurrencyPrice()
        .subscribe((data: string[]) => {
          this.priceData = data;

          if (this.priceData) {
            resolve();
          } else {
            reject(() =>
              console.error(`this.priceData undefined ${this.priceData}`)
            );
          }
        });
    });
  }
}
