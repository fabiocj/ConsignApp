import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BancoProvider } from '../providers/banco/banco';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { ConfigProvider } from '../providers/config/config';
import { DadosProvider } from '../providers/dados/dados';

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
    , dadosProvider: DadosProvider
  ) {
    platform.ready().then(() => {
      let config = configProvider.getConfigData();

      if (config == null) {
        this.rootPage = IntroPage;
        configProvider.setConfigData(false);
      } else {
        this.rootPage = TabsPage;
      }
      console.log('Valor do config: ', config);

      let dados = dadosProvider.getDadosData();

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

