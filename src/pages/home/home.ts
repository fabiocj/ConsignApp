import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ToastOptions } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';

import { BrMaskerIonic3, BrMaskModel } from 'brmasker-ionic-3';
import { RendasPage } from '../rendas/rendas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: any;

  public hide: boolean = false;
  public resultado: string;
  public resultadoAnalise: string;
  public rendaRestante: number;
  public percentualComprometido: number; //percentual ja comprometido da renda
  public percentualRestante: number; //percentual ja comprometido da renda
  public percentualPodeComprometer: number = 35; //percentual que a pessoa pode comprometer da renda: 35%: verificar se eh melhor colocar 0,35
  public valor: number;

  public toastOptions: ToastOptions;
  public toastMessage: string;


  @ViewChild('rendas') rendas;
  @ViewChild('despesas') despesas;

  constructor(
    public navCtrl: NavController
    , public http: HttpClient
    , public toastCtrl: ToastController
  ) {
    //this.loadData();
  }

  loadData() {
    let data: Observable<any>;
    data = this.http.get('https://jsonplaceholder.typicode.com/posts');
    data.subscribe(results => {
      this.items = results;
    })
  }

  itemClick(itemid: number) {
    alert(itemid);
  }

  showToast(mensagem: string) {
    this.toastOptions = {
      message: mensagem
      , duration: 3000
      , position: 'bottom'
    }

    this.toastCtrl.create(this.toastOptions).present();
  }

  valeAPena() {

    this.rendaRestante = this.rendas.value - this.despesas.value;
    this.valor = (this.rendas.value * 35) / 100;


    // percentual da renda comprometida
    this.percentualComprometido = ((this.despesas.value * 100) / this.rendas.value);
    this.percentualRestante = 100 - this.percentualComprometido;

    if (this.rendas.value == 0) {
      this.showToast('Por favor, informe alguma renda!!');
    } else {
      if (this.valor < this.rendaRestante) {
        this.resultado = "Vale a Pena!!";
        this.hide = !this.hide;
      } else {
        this.resultado = "Não Vale a Pena!!";
        this.hide = !this.hide;
      }
    }
  }

  ngIfCtrl() {
    this.hide = !this.hide;
  }

  addRenda() {
    this.navCtrl.push(RendasPage);
  }

}
