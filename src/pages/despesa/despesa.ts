import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BancoProvider, CaixaList } from '../../providers/banco/banco';
import { EditPage } from '../edit/edit';

@Component({
  selector: 'page-despesa',
  templateUrl: 'despesa.html',
})
export class DespesaPage {
  caixas: CaixaList[];
  public hide: boolean = false;

  constructor(
    public navCtrl: NavController
    , private bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DespesaPage');
  }

  ionViewDidEnter() {
    this.bancoProvider.calcular();
    this.bancoProvider.getAllDespesa()
      .then(results => {
        this.caixas = results;
      });
  }

  addDespesa() {
    this.navCtrl.push(EditPage, { transacao: "Adicionar", origem: "Despesa" });
  }

  editDespesa(item: CaixaList) {
    this.navCtrl.push(EditPage, { key: item.key, caixa: item.caixa, transacao: "Editar", valor: item.caixa.valor, origem: "Despesa" });
  }

  removeDespesa(item: CaixaList) {
    let valorDespesas = (Number(localStorage.getItem("totalDespesa")));
    this.bancoProvider.remove(item.key)
      .then(() => {
        let index = this.caixas.indexOf(item);
        valorDespesas -=  (item.caixa.valor * 1);
        localStorage.setItem('totalDespesa', String(valorDespesas));
        this.bancoProvider.calcular();
        this.caixas.splice(index, 1);

        this.toastCtrl.create({
          message: 'Despesa removida!'
          , duration: 2000
          , position: 'bottom'
        }).present();
      });
    this.bancoProvider.calcular();
  }

  ngIfCtrl() {
    this.hide = !this.hide;
  }

}
