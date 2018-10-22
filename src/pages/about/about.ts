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
          }
        },
        {
          text: 'Apagar',
          handler: () => {
            this.bancoProvider.hardReset();
            localStorage.setItem('mostraTutorial', 'sim');
            localStorage.setItem('totalRenda', String(0));
            localStorage.setItem('totalDespesa', String(0));
            localStorage.setItem('totalConsignado', String(0));
            localStorage.setItem('valorSaldo', String(0));
            localStorage.setItem('valorPercDisponivel', String(0));
            localStorage.setItem('valorPercComprometido', String(0));
          }
        }
      ]
    });
    alert.present();
  }

  tutorial() {
    localStorage.setItem('mostraTutorial', 'sim');
  }

}
