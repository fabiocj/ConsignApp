import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { NavController, ToastOptions, ToastController } from 'ionic-angular';
import { BancoProvider, CaixaList } from '../../providers/banco/banco';
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe, PercentPipe } from '@angular/common';

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

  @ViewChild('totalRendas') totalRendas;
  @ViewChild('totalDespesas') totalDespesas;
  @ViewChild('restanteValor') restanteValor;
  @ViewChild('percRendaRestante') percRendaRestante;
  @ViewChild('percRendaComprometida') percRendaComprometida;

  constructor(
    public navCtrl: NavController
    , public http: HttpClient
    , private bancoProvider: BancoProvider
    , public toastCtrl: ToastController
    , private currencyPipe: CurrencyPipe
    , private percentPipe: PercentPipe
  ) {
  }

  getCurrency(valor: number) {
    return this.currencyPipe.transform(valor, 'BRL', 'symbol', '1.2');
  }

  getPercent(valor: number) {
    return this.percentPipe.transform(valor, '1.2');
  }


  getTotal(items, calculationProperty: string) {
    if (typeof items !== 'undefined') {
      return items.reduce((total, item) => {
        return total + item[calculationProperty];
      }, 0);
    }
    return 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewDidEnter() {
    let valorRendas: number;
    let valorDespesas: number;
    let valorRestante: number;
    let valorPercRestante: number;
    let valorPercComprometida: number;

    this.bancoProvider.calculaTotal();

    valorRendas = Number(localStorage.getItem("totalRenda"));
    valorDespesas = Number(localStorage.getItem("totalDespesa"));
    valorRestante = valorRendas - valorDespesas;
    valorPercComprometida = ((valorDespesas) / valorRendas);
    valorPercRestante = (1 - valorPercComprometida);

    this.totalRendas = this.getCurrency(valorRendas);
    console.log('A renda ficou assim: ', this.totalRendas);
    this.totalDespesas = this.getCurrency(valorDespesas);
    console.log('Fica assim totalDespesas: ', String(this.totalDespesas));
    this.restanteValor = this.getCurrency(valorRestante);
    this.percRendaComprometida = this.getPercent(valorPercComprometida);
    this.percRendaRestante = this.getPercent(valorPercRestante);
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
    /*
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
    */
  }

  ngIfCtrl() {
    this.hide = !this.hide;
  }

}
