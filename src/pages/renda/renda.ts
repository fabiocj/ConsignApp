import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
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
    , private bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RendaPage');
  }

  ionViewDidEnter() {
    this.bancoProvider.calcular();
    this.bancoProvider.getAllRenda()
      .then(results => {
        this.caixas = results;
      });
  }

  addRenda() {
    this.navCtrl.push(EditPage, { transacao: "Adicionar", origem: "Renda" });
  }

  editRenda(item: CaixaList) {
    this.navCtrl.push(EditPage, { key: item.key, caixa: item.caixa, transacao: "Editar", valor: item.caixa.valor, origem: "Renda" });
  }

  removeRenda(item: CaixaList) {
    let valorRendas = (Number(localStorage.getItem("totalRenda")));
    this.bancoProvider.remove(item.key)
      .then(() => {
        let index = this.caixas.indexOf(item);
        valorRendas -= (item.caixa.valor * 1);
        localStorage.setItem('totalRenda', String(valorRendas));
        this.bancoProvider.calcular();
        this.caixas.splice(index, 1);

        this.toastCtrl.create({
          message: 'Renda removida!'
          , duration: 2000
          , position: 'bottom'
        }).present();
      });
    this.bancoProvider.calcular();
  }

}
