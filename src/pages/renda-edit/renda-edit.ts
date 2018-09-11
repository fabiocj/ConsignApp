import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BancoProvider, Renda } from '../../providers/banco/banco';

@IonicPage()
@Component({
  selector: 'page-renda-edit',
  templateUrl: 'renda-edit.html',
})
export class RendaEditPage {
  model: Renda;
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
      this.model = new Renda();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RendaEditPage');
  }

  save() {
    this.saveRenda()
      .then(() => {
        this.toastCtrl.create({
          message: 'Renda salva!'
          , duration: 3000
          , position: 'bottom'
        }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toastCtrl.create({
          message: 'Erro ao salvar a Renda!'
          , duration: 3000
          , position: 'bottom'
        }).present();
      })
  }

  private saveRenda() {
    if (this.key) {
      return this.bancoProvider.rendaUpdate(this.key, this.model);
    } else {
      return this.bancoProvider.rendaInsert(this.model);
    }
  }

}
