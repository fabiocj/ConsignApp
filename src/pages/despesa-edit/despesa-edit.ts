import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BancoProvider, Caixa } from '../../providers/banco/banco';

@IonicPage()
@Component({
  selector: 'page-despesa-edit',
  templateUrl: 'despesa-edit.html',
})
export class DespesaEditPage {
  model: Caixa;
  key: string;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {

    if (this.navParams.data.banco && this.navParams.data.key) {
      this.model = this.navParams.data.banco;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Caixa();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DespesaEditPage');
  }

  save() {
    this.saveDespesa()
      .then(() => {
        this.toastCtrl.create({
          message: 'Despesa salva!'
          , duration: 3000
          , position: 'bottom'
        }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toastCtrl.create({
          message: 'Erro ao salvar a Despesa!'
          , duration: 3000
          , position: 'bottom'
        }).present();
      })
  }

  private saveDespesa() {
    if (this.key) {
      return this.bancoProvider.update(this.key, this.model);
    } else {
      return this.bancoProvider.insert(this.model);
    }
  }

}
