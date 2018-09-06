import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RendasCadastroPage } from '../rendas-cadastro/rendas-cadastro';

@IonicPage()
@Component({
  selector: 'page-rendas',
  templateUrl: 'rendas.html',
})
export class RendasPage {

  nome: string;
  sobrenome: string;
  idade: number;
  conteudo: boolean;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RendasPage');
  }

  cadastrar() {
    this.navCtrl.push(RendasCadastroPage.name);
  }

}
