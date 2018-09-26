import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BancoProvider, CaixaList } from '../../providers/banco/banco';
import { EditPage } from '../edit/edit';

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
    this.bancoProvider.getAllRenda()
      .then(results => {
        this.caixas = results;
      });
  }

  addRenda() {
    this.navCtrl.push(EditPage, { transacao: "Adicionar", origem: "Renda" } );
  }

  editRenda(item: CaixaList) {
    this.navCtrl.push(EditPage, { key: item.key, caixa: item.caixa, transacao: "Editar", origem: "Renda" });
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
