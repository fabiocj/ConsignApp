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

  constructor(
    platform: Platform
    , statusBar: StatusBar
    , splashScreen: SplashScreen
  ) {
    let mostraTutorial;

    platform.ready().then(() => {

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
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

