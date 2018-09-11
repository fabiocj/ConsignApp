import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    , public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RendasPage');
  }

  cadastrar() {
    //this.navCtrl.push(RendasCadastroPage.name);
    this.showPrompt();
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Adicionar Renda',
      message: "Informe a renda a ser adicionada",
      inputs: [
        {
          name: 'nome'
          , placeholder: 'Nome'
          , type: 'text'
        }
        ,{
          name: 'valor'
          , placeholder: 'R$'
          , type: 'number'
        }

      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
