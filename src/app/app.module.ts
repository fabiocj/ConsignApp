import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { MyApp } from './app.component';
import { RendasPageModule } from '../pages/rendas/rendas.module';
import { RendasCadastroPageModule } from '../pages/rendas-cadastro/rendas-cadastro.module';
import { DespesasPageModule } from '../pages/despesas/despesas.module';
import { DespesasCadastroPageModule } from '../pages/despesas-cadastro/despesas-cadastro.module';
import { BancoProvider } from '../providers/banco/banco';
import { NativeStorage } from '@ionic-native/native-storage';
import { ConfigProvider } from '../providers/config/config';
import { IntroPageModule } from '../pages/intro/intro.module';

@NgModule({
  declarations: [
    MyApp
    , HomePage
    , AboutPage
    , TabsPage
  ],
  imports: [
    BrowserModule
    , HttpClientModule
    , BrMaskerModule
    , RendasPageModule
    , DespesasPageModule
    , DespesasCadastroPageModule
    , RendasCadastroPageModule
    , IntroPageModule
    , IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    , HomePage
    , AboutPage
    , TabsPage
  ],
  providers: [
    StatusBar
    , SplashScreen
    , {
      provide: ErrorHandler
      , useClass: IonicErrorHandler
    }
    , BancoProvider
    , NativeStorage,
    ConfigProvider
  ]
})
export class AppModule { }
