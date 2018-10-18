import { Component } from '@angular/core';
import { IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { BancoProvider } from '../../providers/banco/banco';

@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {

  public items: any;
  public data;
  public valor;
  loading: any;

  constructor(
    private loadingCtrl: LoadingController
    , public bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ConsultaPage');
  }

  dados(consulta: string) {
    let dados: Observable<any>;
    let texto: string;
    this.carregarLoad();

    if (consulta == 'selicDia' ) {
      dados = this.bancoProvider.loadSelicDia();
      texto = 'Taxa de Juros Selic ao Dia';
    } else if (consulta == 'selicMes') {
      dados = this.bancoProvider.loadSelicMes();
      texto = 'Taxa de Juros Selic ao Mês';
    } else if (consulta == 'selicAno') {
      dados = this.bancoProvider.loadSelicAno();
      texto = 'Taxa de Juros Selic ao Ano';
    } else if (consulta == 'credPesConsigSetorPrivado') {
      dados = this.bancoProvider.loadCredPesConsigSetorPrivado();
      texto = 'Taxa Média Mensal de Juros - Pessoa Física - Crédito Pessoal Consignado para Trabalhadores do Setor Privado';
    } else if (consulta == 'credPesConsigAposPenINSS') {
      dados = this.bancoProvider.loadCredPesConsigAposPenINSS();
      texto = 'Taxa Média Mensal de Juros - Pessoa Física - Crédito Pessoal Consignado para Aposentados e Pensionistas do INSS';
    } else if (consulta == 'credPesConsigTotal') {
      dados = this.bancoProvider.loadCredPesConsigTotal();
      texto = 'Taxa Média Mensal de Juros - Pessoa Física - Crédito Pessoal Consignado Total';
    } else if (consulta == 'credPesNaoConsig') {
      dados = this.bancoProvider.loadCredPesNaoConsig();
      texto = 'Taxa Média Mensal de Juros - Pessoa Física - Crédito Pessoal Não Consignado';
    } else if (consulta == 'chequeEspecial') {
      dados = this.bancoProvider.loadChequeEspecial();
      texto = 'Taxa Média Mensal de Juros - Pessoa Física - Cheque Especial';
    }
    this.loading.dismiss().then(() => {
      dados.subscribe(results => {
        this.items = results;
        this.data = this.items[0].data;
        this.valor = this.items[0].valor;
        this.toastCtrl.create({
          message: `${texto}: ${this.valor}%, última atualização em: ${this.data}.`
          , duration: 6000
          , position: 'bottom'
          , cssClass: "normalToast"
        }).present();
      });
    })

  }

  carregarLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
      , spinner: 'circles'
    });
    this.loading.present();
  }

}
