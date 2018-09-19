import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BancoProvider, CaixaList } from '../../providers/banco/banco';
import { CaixaEditPage } from '../caixa-edit/caixa-edit';

@Component({
  selector: 'page-renda',
  templateUrl: 'renda.html',
})
export class RendaPage {
  caixas: CaixaList[];

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
    this.bancoProvider.getAll()
      .then(results => {
        this.caixas = results;
      })
  }

  addRenda() {
    //this.navCtrl.push(RendaEditPage);
    this.navCtrl.push(CaixaEditPage);
  }

  editRenda(item: CaixaList) {
    this.navCtrl.push(CaixaEditPage, { key: item.key, caixa: item.caixa });
  }

  removeRenda(item: CaixaList) {
    this.bancoProvider.remove(item.key)
      .then(() => {
        let index = this.caixas.indexOf(item);
        this.caixas.splice(index, 1);

        this.toastCtrl.create({
          message: 'Renda removida!'
          , duration: 3000
          , position: 'bottom'
        }).present();
      });
  }

}
