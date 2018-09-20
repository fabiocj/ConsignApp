import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BancoProvider, CaixaList } from '../../providers/banco/banco';
import { CaixaEditPage } from '../caixa-edit/caixa-edit';

@Component({
  selector: 'page-despesa',
  templateUrl: 'despesa.html',
})
export class DespesaPage {
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
    console.log('ionViewDidLoad DespesaPage');
  }

  ionViewDidEnter() {
    this.bancoProvider.getAllDespesa()
      .then(results => {
        this.caixas = results;
      })
  }

  addDespesa() {
    this.navCtrl.push(CaixaEditPage, { transacao: "Adicionar", origem: "Despesa" } );
  }

  editDespesa(item: CaixaList) {
    this.navCtrl.push(CaixaEditPage, { key: item.key, caixa: item.caixa, transacao: "Editar", origem: "Despesa" });
  }

  removeDespesa(item: CaixaList) {
    this.bancoProvider.remove(item.key)
      .then(() => {
        let index = this.caixas.indexOf(item);
        this.caixas.splice(index, 1);

        this.toastCtrl.create({
          message: 'Despesa removida!'
          , duration: 3000
          , position: 'bottom'
        }).present();
      });
  }

}
