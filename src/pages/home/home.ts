import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: any;

  constructor(
    public navCtrl: NavController
    ,public http: HttpClient
  ) {
    this.loadData();
  }

  loadData() {
    let data: Observable<any>;
    data = this.http.get('https://jsonplaceholder.typicode.com/posts');
    data.subscribe(results => {
      this.items = results;
    })
  }

  itemClick(itemid:number) {
    alert(itemid);
  }

}
