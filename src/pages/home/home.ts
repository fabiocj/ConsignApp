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

  // SELIC ao Dia
  public selicADData: any;
  public selicADValor: any;
  // SELIC ao Mês
  public selicAMData: any;
  public selicAMValor: any;
  // SELIC ao Ano
  public selicAAData: any;
  public selicAAValor: any;

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

    this.loadSelic();

    let dia = bancoProvider.getSelicDia();
    let mes = bancoProvider.getSelicMes();
    let ano = bancoProvider.getSelicAno();
    Promise.all([dia, mes, ano])
      .then((result: any) => {
        let selicAnoData2 = result[2];
        console.log('valor de teste dentro do then: ', selicAnoData2);
      });
  }

  getCurrency(valor: number) {
    return this.currencyPipe.transform(valor, 'BRL', 'symbol', '1.2');
  }

  getPercent(valor: number) {
    return this.percentPipe.transform(valor, '1.2');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomePage');
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
    //console.log('A Renda ficou assim: ', this.totalRendas);
    this.totalDespesas = this.getCurrency(valorDespesas);
    //console.log('A Despesa ficou assim: ', String(this.totalDespesas));
    this.restanteValor = this.getCurrency(valorRestante);
    //console.log('O Resto ficou assim: ', String(this.restanteValor));
    this.percRendaComprometida = this.getPercent(valorPercComprometida);
    //console.log('O % Comprometido ficou assim: ', String(this.percRendaComprometida));
    this.percRendaRestante = this.getPercent(valorPercRestante);
    //console.log('O % Restante ficou assim: ', String(this.percRendaRestante));
  }

  loadData() {
    let data: Observable<any>;
    data = this.http.get('https://jsonplaceholder.typicode.com/posts');
    data.subscribe(results => {
      this.items = results;
    })
  }

  loadSelic() {
    let selicDia = this.bancoProvider.getSelicDia().then(data => {
      console.log('Dados do getSelicDia: ', data);
    });
    let selicMes = this.bancoProvider.getSelicMes().then(data => {
      console.log('Dados do getSelicMes: ', data);
    });
    let selicAno = this.bancoProvider.getSelicAno().then(data => {
      console.log('Dados do getSelicAno: ', data);
    });
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

}
