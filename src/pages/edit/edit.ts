import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BancoProvider, Caixa } from '../../providers/banco/banco';
import { CurrencyPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  model: Caixa;
  key: string;
  origem: string;
  transacao: string;
  tipo: boolean;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {

    this.origem = navParams.get('origem');
    this.transacao = navParams.get('transacao');
    if (this.origem == "Renda") {
      this.tipo = true;
      //console.log("É RENDAAAAA! :)");
    } else {
      this.tipo = false;
      //console.log("É DESPESA! :(");
    }

    if (this.navParams.data.caixa && this.navParams.data.key) {
      this.model = this.navParams.data.caixa;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Caixa();
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditPage');
  }

  save() {
    if (this.model.descricao == null || this.model.descricao == '') {
      this.toastCtrl.create({
        message: 'Favor informar um Nome para a ' + this.origem + '!'
        , duration: 3000
        , position: 'bottom'
      }).present();
    } else if (this.model.valor == null || this.model.valor == 0) {
      this.toastCtrl.create({
        message: 'Favor informar um Valor para a ' + this.origem + '!'
        , duration: 3000
        , position: 'bottom'
      }).present();
    } else {
      this.saveCaixa()
        .then(() => {
          this.toastCtrl.create({
            message: this.origem + ' salva!'
            , duration: 3000
            , position: 'bottom'
          }).present();
          this.navCtrl.pop();
        })
        .catch(() => {
          this.toastCtrl.create({
            message: 'Erro ao salvar a ' + this.origem + '!'
            , duration: 3000
            , position: 'bottom'
          }).present();
        })
    }
  }

  private saveCaixa() {
    this.model.ehRenda = this.tipo;
    if (this.key) {
      return this.bancoProvider.update(this.key, this.model);
    } else {
      return this.bancoProvider.insert(this.model);
    }
  }

}
