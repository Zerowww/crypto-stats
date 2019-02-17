import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Subscription } from 'rxjs/Subscription';
import { DatePipe } from '@angular/common';
import Chart from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-crypto-currency-detail',
  templateUrl: 'crypto-currency-detail.html',
})
export class CryptoCurrencyDetailPage {
  // Crypto trigram required for requests
  // Also used as title
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
    // It shouldn't be undefined and it wouldn't work right now anyway if it was
    // But it is a nice example of using ternary expressions
    this._navParams.get('name')
      ? (this.activeCryptoCurrencyName = this._navParams.get('name'))
      : 'Crypto Stats';
  }

  public ionViewDidLoad(): void {
    // I just want to be sure that all the data required for building my charts are there
    // Before initializing them, that's why I use Promise
    this._initDailyData().then(() => {
      this._initDailyCharts();
    });

    this._initPriceData().then(() => {
      this._initPriceCharts();
    });
  }

  public ionViewWillLeave(): void {
    // It is required to unsubscribe from your observables
    // Before leaving the component
    this.subDailyData.unsubscribe();
    this.subPriceData.unsubscribe();
  }

  /*
   *
   * INIT
   *
   */

  private _initDailyCharts(): void {
    // I use DatePipe to transform raw api data into a string
    const dailyChartLabels = this.dailyData.map(data => {
      return new DatePipe('en-En').transform(
        new Date(data['time']),
        'shortTime'
      );
    });

    // The operator + easily casts a string into a number
    // I could also use Number(data['close']);
    const dailyChartData = this.dailyData.map(data => {
      return +data['close'];
    });

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
            // I resolve my promise only when I'm sure I'm getting something back from my request
            resolve();
          } else {
            reject(() =>
              // backticks are easier to read
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
            // I resolve my promise only when I'm sure I'm getting something back from my request
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
