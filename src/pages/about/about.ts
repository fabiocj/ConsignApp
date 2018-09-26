import { Component } from '@angular/core';
import { BancoProvider } from '../../providers/banco/banco';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(
    private bancoProvider: BancoProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  apagar() {
    this.bancoProvider.hardReset();
  }
}
