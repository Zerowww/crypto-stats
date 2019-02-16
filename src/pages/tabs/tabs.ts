import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  homeRoot: string = 'HomePage';
  newsRoot: string = 'NewsPage';

  constructor() {}
}
