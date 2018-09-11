import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BancoProvider, DespesaList } from '../../providers/banco/banco';
import { DespesaEditPage } from '../despesa-edit/despesa-edit';

@Component({
  selector: 'page-despesa',
  templateUrl: 'despesa.html',
})
export class DespesaPage {
  despesas: DespesaList[];

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public alertCtrl: AlertController
    , private bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {

  }

  ionViewDidEnter() {
    this.bancoProvider.despesaGetAll()
      .then(results => {
        this.despesas = results;
      })
  }

  addRenda() {
    this.navCtrl.push(DespesaEditPage);
  }

  editRenda(item: DespesaList) {
    this.navCtrl.push(DespesaEditPage, { key: item.key, renda: item.renda });
  }

  removeRenda(item: DespesaList) {
    this.bancoProvider.rendaRemove(item.key)
      .then(() => {
        let index = this.despesas.indexOf(item);
        this.despesas.splice(index, 1);

        this.toastCtrl.create({
          message: 'Renda removida!'
          , duration: 3000
          , position: 'bottom'
        }).present();
      });
  }


}
