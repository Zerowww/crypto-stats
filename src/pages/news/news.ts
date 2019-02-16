import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { News } from '../../models/news.model';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public news: News[];
  constructor(
    public _navCtrl: NavController,
    public _navParams: NavParams,
    private _rest: RestProvider
  ) {}

  ionViewDidLoad() {}

  public getNews(): void {
    this._rest.getNews().subscribe(
      (response: string[]) => {
        const data = response;

        data.forEach(data => {
          const news: News = {
            id: data['id'],
            linkPath: data['guid'],
            title: data['title'],
            imgPath: data['url'],
            source: data['source'],
          };
          console.log(data);
          this.news.push(news);
        });
      },
      error => console.error(error)
    );
  }
}
