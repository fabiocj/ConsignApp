import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BancoProvider } from '../providers/banco/banco';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { ConfigProvider } from '../providers/config/config';

@Component({
  templateUrl: 'app.html'
  , providers: [
    BancoProvider
    , ConfigProvider
  ]
})
export class MyApp {
  rootPage: any = IntroPage;

  constructor(
    platform: Platform
    , statusBar: StatusBar
    , splashScreen: SplashScreen
    , configProvider: ConfigProvider
  ) {
    let mostraTutorial: boolean;

    platform.ready().then(() => {
      //let config = configProvider.getConfigData();

      console.log('localStorage.getItem("mostraTutorial"): ', localStorage.getItem("mostraTutorial"))
      mostraTutorial = Boolean(localStorage.getItem("mostraTutorial"));
      console.log('valor depois do getItem: ', mostraTutorial);

      //console.log('Valor config: ', config);
      this.rootPage = IntroPage;


      
      if (mostraTutorial == null) {
        console.log('entrou no null');
        this.rootPage = IntroPage;
        localStorage.setItem('mostraTutorial', String(true));
        //configProvider.setConfigData(false);
      } else {
        this.rootPage = TabsPage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

