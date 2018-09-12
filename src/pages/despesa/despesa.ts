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
      .then(resultsDespesa => {
        this.despesas = resultsDespesa;
      })
  }

  addDespesa() {
    this.navCtrl.push(DespesaEditPage);
  }

  editDespesa(itemDespesa: DespesaList) {
    this.navCtrl.push(DespesaEditPage, { key: itemDespesa.key, despesa: itemDespesa.despesa });
  }

  removeDespesa(itemDespesa: DespesaList) {
    this.bancoProvider.despesaRemove(itemDespesa.key)
      .then(() => {
        let index = this.despesas.indexOf(itemDespesa);
        this.despesas.splice(index, 1);

        this.toastCtrl.create({
          message: 'Despesa removida!'
          , duration: 3000
          , position: 'bottom'
        }).present();
      });
  }


}
