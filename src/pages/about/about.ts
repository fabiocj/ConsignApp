import { Component } from '@angular/core';
import { BancoProvider } from '../../providers/banco/banco';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(
    private bancoProvider: BancoProvider
    , private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AboutPage');
  }

  apagar() {
    let alert = this.alertCtrl.create({
      title: 'Apagar Dados',
      message: 'Você realmente deseja apagar os dados do seu App?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //console.log('Cancelar clicked');
          }
        },
        {
          text: 'Apagar',
          handler: () => {
            this.bancoProvider.hardReset();
            //console.log('Apagar clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
