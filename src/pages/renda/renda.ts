import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BancoProvider, RendaList } from '../../providers/banco/banco';
import { RendaEditPage } from '../renda-edit/renda-edit';

@Component({
  selector: 'page-renda',
  templateUrl: 'renda.html',
})
export class RendaPage {
  rendas: RendaList[];

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public alertCtrl: AlertController
    , private bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RendaPage');
  }

  ionViewDidEnter() {
    this.bancoProvider.rendaGetAll()
      .then(resultsRenda => {
        this.rendas = resultsRenda;
      })
  }

  addRenda() {
    this.navCtrl.push(RendaEditPage);
  }

  editRenda(itemRenda: RendaList) {
    this.navCtrl.push(RendaEditPage, { key: itemRenda.key, renda: itemRenda.renda });
  }

  removeRenda(itemRenda: RendaList) {
    this.bancoProvider.rendaRemove(itemRenda.key)
      .then(() => {
        let index = this.rendas.indexOf(itemRenda);
        this.rendas.splice(index, 1);

        this.toastCtrl.create({
          message: 'Renda removida!'
          , duration: 3000
          , position: 'bottom'
        }).present();
      });
  }

}
