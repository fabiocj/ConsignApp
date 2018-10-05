import { Component } from '@angular/core';
import { BancoProvider } from '../../providers/banco/banco';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  public items: any;

  constructor(
    private bancoProvider: BancoProvider
    , public http: HttpClient
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  apagar() {
    this.bancoProvider.hardReset();
  }

  loadDataCIDATA() {
    //this.bancoProvider.loadDataCIDATA();
    let data: Observable<any>;
    let results: any;
    //data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json');
    //Taxa de Juros SELIC A.D.: https://dadosabertos.bcb.gov.br/dataset/11-taxa-de-juros---selic
    //Taxa de Juros SELIC A.M.: https://dadosabertos.bcb.gov.br/dataset/4390-taxa-de-juros---selic-acumulada-no-mes
    //Taxa de Juros SELIC A.A.: https://dadosabertos.bcb.gov.br/dataset/1178-taxa-de-juros---selic-anualizada-base-252
    data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json');
    console.log('baseDadosAbertos: ', data);
    data.subscribe(results => {
      this.items = results;
    })
  }

}
