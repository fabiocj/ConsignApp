import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BancoProvider } from '../providers/banco/banco';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
  , providers: [
    BancoProvider
  ]
})
export class MyApp {
  rootPage: any = IntroPage;
  versaoConsignApp = '9';

  constructor(
    platform: Platform
    , bancoProvider: BancoProvider
    , statusBar: StatusBar
    , splashScreen: SplashScreen
  ) {
    let mostraTutorial;

    platform.ready().then(() => {
      if (localStorage.getItem("versaoConsignApp") == null) {
        bancoProvider.hardReset();
        localStorage.setItem('versaoConsignApp', this.versaoConsignApp);
      } else {
        // tratar aqui a mudança de versao no banco de Dados
        // por exemplo, se a versao atual do app era a 8 e agora é a 9, execute a procedure X
      }
      if (localStorage.getItem("totalRenda") == null) {
        localStorage.setItem('totalRenda', String(0));
      }
      if (localStorage.getItem("totalDespesa") == null) {
        localStorage.setItem('totalDespesa', String(0));
      }
      if (localStorage.getItem("totalConsignado") == null) {
        localStorage.setItem('totalConsignado', String(0));
      }
      if (localStorage.getItem("valorSaldo") == null) {
        localStorage.setItem('valorSaldo', String(0));
      }
      if (localStorage.getItem("valorPercDisponivel") == null) {
        localStorage.setItem('valorPercDisponivel', String(0));
      }
      if (localStorage.getItem("valorPercComprometido") == null) {
        localStorage.setItem('valorPercComprometido', String(0));
      }

      if (localStorage.getItem("mostraTutorial") == null) {
        localStorage.setItem('mostraTutorial', 'nao');
        this.rootPage = IntroPage;
      } else {
        mostraTutorial = localStorage.getItem("mostraTutorial");
        if (mostraTutorial == 'nao') {
          this.rootPage = TabsPage;
        } else {
          localStorage.setItem('mostraTutorial', 'nao');
          this.rootPage = IntroPage;
        }
      }
      bancoProvider.calcular();

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

