import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BancoProvider, Caixa } from '../../providers/banco/banco';

@IonicPage()
@Component({
  selector: 'page-edit'
  , templateUrl: 'edit.html'
  , providers: [
  ]
})
export class EditPage {
  model: Caixa;
  key: string;
  origem: string;
  transacao: string;
  ehRenda: boolean;
  ehConsignado: boolean = false;
  valorRendas: number;
  botaoDesabilitado: boolean;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {

    this.origem = navParams.get('origem');
    this.transacao = navParams.get('transacao');
    if (this.origem == "Renda") {
      this.ehRenda = true;
      this.botaoDesabilitado = true;
    } else {
      this.ehRenda = false;
      this.botaoDesabilitado = false;
    }

    if (this.navParams.data.caixa && this.navParams.data.key) {
      this.model = this.navParams.data.caixa;
      this.ehConsignado = this.model.ehConsignado;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Caixa();
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditPage');
    this.valorRendas = Number(localStorage.getItem("totalRenda"));
  }

  mudaConsignado() {
    this.ehConsignado = !this.ehConsignado;
  }

  save() {
    if (this.valorRendas == 0 && this.origem == 'Despesa') {
      this.toastCtrl.create({
        message: 'Por favor, cadastre alguma Renda antes de ter Despesas!'
        , duration: 2000
        , position: 'bottom'
      }).present();
    } else if (this.model.valor < 0) {
      this.toastCtrl.create({
        message: 'Por favor, os valores informados precisam ser maiores que zero!'
        , duration: 2000
        , position: 'bottom'
      }).present();
    } else if (this.model.descricao == null || this.model.descricao == '') {
      this.toastCtrl.create({
        message: 'Por favor, informar um Nome para a ' + this.origem + '!'
        , duration: 2000
        , position: 'bottom'
      }).present();
    } else if (this.model.valor == null || this.model.valor == 0) {
      this.toastCtrl.create({
        message: 'Por favor, informar um Valor para a ' + this.origem + '!'
        , duration: 2000
        , position: 'bottom'
      }).present();
    } else {
      this.saveCaixa()
        .then(() => {
          this.toastCtrl.create({
            message: this.origem + ' salva!'
            , duration: 2000
            , position: 'bottom'
          }).present();
          this.navCtrl.pop();
        })
        .catch(() => {
          this.toastCtrl.create({
            message: 'Erro ao salvar a ' + this.origem + '!'
            , duration: 2000
            , position: 'bottom'
          }).present();
        })
    }
  }

  private saveCaixa() {
    this.model.ehConsignado = this.ehConsignado;
    this.model.ehRenda = this.ehRenda;
    if (this.key) {
      return this.bancoProvider.update(this.key, this.model);
    } else {
      return this.bancoProvider.insert(this.model);
    }
  }

}
