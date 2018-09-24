import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ToastOptions } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';

import { BancoProvider, CaixaList } from '../../providers/banco/banco';

import { BrMaskerIonic3, BrMaskModel } from 'brmasker-ionic-3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  caixas: CaixaList[];
  caixasRendas: CaixaList[];
  caixasDespesas: CaixaList[];

  public items: any;

  public hide: boolean = false;
  public resultado: string;
  public resultadoAnalise: string;
  public rendaRestante: number;
  public percentualComprometido: number; //percentual ja comprometido da renda
  public percentualRestante: number; //percentual ja comprometido da renda
  public percentualPodeComprometer: number = 35; //percentual que a pessoa pode comprometer da renda: 35%: verificar se eh melhor colocar 0,35
  public valor: number;

  public totalRenda: number;
  public total: number;

  public toastOptions: ToastOptions;
  public toastMessage: string;

  @ViewChild('rendas') rendas;
  @ViewChild('despesas') despesas;

  constructor(
    public navCtrl: NavController
    , public http: HttpClient
    , public toastCtrl: ToastController
    , private bancoProvider: BancoProvider
  ) {
    //this.loadData();
    //this.totalQuantity = this.getTotal(this.items, 'itemPrice');
    //console.log('valor total quantidade: ', this.totalQuantity);
  }

  getTotal(items, calculationProperty: string) {
    if (typeof items !== 'undefined') {
      return items.reduce((total, item) => {
        return total + item[calculationProperty];
      }, 0);
    }
    return 0;
  }

  ionViewDidEnter() {
    //this.carregarProviders();
    this.bancoProvider.getValorRenda()
    
    console.log('resultado do total no home: ', );
  }

  public carregarProviders() {
    let total: number = 0;

    this.bancoProvider.getAllRenda()
      .then(resultsRenda => {
        this.caixasRendas = resultsRenda;
      });
    this.bancoProvider.getAllDespesa()
      .then(resultsDespesa => {
        this.caixasDespesas = resultsDespesa;
      });

    console.log('Lista de Rendas: ', this.caixasRendas);
    //console.log('Lista de Despesas: ', this.caixasDespesas);

    console.log('tamanho do vetor: ', this.caixasRendas.length);

    for (let lista of this.caixasRendas) {
      console.log(lista.caixa.valor);
      total += (lista.caixa.valor * 1);
    }
    console.log('valor total: ', total);

    total = 0;
    if (this.caixasRendas != null && this.caixasRendas.length > 0) {
      this.caixasRendas.forEach(x => total += (x.caixa.valor * 1));
    }
    console.log('valor total embaixo: ', total);
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

  goRendas() {
    //this.navCtrl.push(RendasPage);
    this.navCtrl.parent.select(1);
  }

  goDespesas() {
    //this.navCtrl.push(DespesasPage);
    this.navCtrl.parent.select(2);
  }

}
