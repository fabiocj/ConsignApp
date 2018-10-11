import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { BancoProvider } from '../../providers/banco/banco';


@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {

  public items: any;
  loading: any;

  @ViewChild('consulta') consulta;
  @ViewChild('data') data;
  @ViewChild('valor') valor;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private loadingCtrl: LoadingController
    , public bancoProvider: BancoProvider
  ) {

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ConsultaPage');
    this.consulta = 'Taxa';
  }

  carregarLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
      , spinner: 'circles'
    });

    this.loading.present();
  }

  selicDia() {
    this.carregarLoad();
    this.consulta = 'Taxa de Juros Selic ao Dia';
    let data: Observable<any>;
    data = this.bancoProvider.loadSelicDia();
    //console.log('baseDadosAbertos: ', data);
    this.loading.dismiss().then(() => {
      data.subscribe(results => {
        this.items = results;
        this.data = this.items[0].data;
        this.valor = this.items[0].valor;
        //console.log('Resultado aqui do items data: ', this.items[0].data);
        //console.log('Resultado aqui do items valor: ', this.items[0].valor);
      })
    });
  }

  selicMes() {
    this.carregarLoad();
    this.consulta = 'Taxa de Juros Selic ao Mês';
    let data: Observable<any>;
    data = this.bancoProvider.loadSelicMes();
    this.loading.dismiss().then(() => {
      data.subscribe(results => {
        this.items = results;
        this.data = this.items[0].data;
        this.valor = this.items[0].valor;
      })
    });
  }

  selicAno() {
    this.carregarLoad();
    this.consulta = 'Taxa de Juros Selic ao Ano';
    let data: Observable<any>;
    data = this.bancoProvider.loadSelicAno();
    this.loading.dismiss().then(() => {
      data.subscribe(results => {
        this.items = results;
        this.data = this.items[0].data;
        this.valor = this.items[0].valor;
      })
    });
  }

  credPesConsigSetorPrivado() {
    this.carregarLoad();
    this.consulta = 'Taxa média mensal de juros - PF - Crédito pessoal Consignado para Trabalhadores do Setor Privado';
    let data: Observable<any>;
    data = this.bancoProvider.loadCredPesConsigSetorPrivado();
    this.loading.dismiss().then(() => {
      data.subscribe(results => {
        this.items = results;
        this.data = this.items[0].data;
        this.valor = this.items[0].valor;
      })
    });
  }

  credPesConsigAposPenINSS() {
    this.carregarLoad();
    this.consulta = 'Taxa média mensal de juros - PF - Crédito pessoal consignado para aposentados e pensionistas do INSS';
    let data: Observable<any>;
    data = this.bancoProvider.loadCredPesConsigAposPenINSS();
    this.loading.dismiss().then(() => {
      data.subscribe(results => {
        this.items = results;
        this.data = this.items[0].data;
        this.valor = this.items[0].valor;
      })
    });
  }

  credPesConsigTotal() {
    this.carregarLoad();
    this.consulta = 'Taxa média mensal de juros - PF - Crédito pessoal consignado total';
    let data: Observable<any>;
    data = this.bancoProvider.loadCredPesConsigTotal();
    this.loading.dismiss().then(() => {
      data.subscribe(results => {
        this.items = results;
        this.data = this.items[0].data;
        this.valor = this.items[0].valor;
      })
    });
  }

  credPesNaoConsig() {
    this.carregarLoad();
    this.consulta = 'Taxa média mensal de juros - PF - Crédito pessoal não consignado';
    let data: Observable<any>;
    data = this.bancoProvider.loadCredPesNaoConsig();
    this.loading.dismiss().then(() => {
      data.subscribe(results => {
        this.items = results;
        this.data = this.items[0].data;
        this.valor = this.items[0].valor;
      })
    });
  }

  chequeEspecial() {
    this.carregarLoad();
    this.consulta = 'Taxa média mensal de juros - PF - Cheque especial';
    let data: Observable<any>;
    data = this.bancoProvider.loadChequeEspecial();
    this.loading.dismiss().then(() => {
      data.subscribe(results => {
        this.items = results;
        this.data = this.items[0].data;
        this.valor = this.items[0].valor;
      })
    });
  }

}
