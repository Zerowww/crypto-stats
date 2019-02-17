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
  public news: News[] = [];

  constructor(
    public _navCtrl: NavController,
    public _navParams: NavParams,
    private _rest: RestProvider
  ) {}

  ionViewDidLoad() {
    this.getNews();
  }

  public getNews(): void {
    this._rest.getNews().subscribe(
      (res: string[]) => {
        const data = res['Data'];

        data.forEach(data => {
          const news: News = {
            id: data['id'],
            linkPath: data['url'],
            title: data['title'],
            imgPath: data['imageurl'],
            source: data['source'],
          };
          this.news.push(news);
        });
        console.log(res);
        console.log(this.news);
      },
      error => console.error(error)
    );
  }
}
