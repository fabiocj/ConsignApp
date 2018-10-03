import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { MyApp } from './app.component';
import { BancoProvider } from '../providers/banco/banco';
import { ConfigProvider } from '../providers/config/config';
import { IntroPageModule } from '../pages/intro/intro.module';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RendaPage } from '../pages/renda/renda';
import { DespesaPage } from '../pages/despesa/despesa';
import { EditPage } from '../pages/edit/edit';

@NgModule({
  declarations: [
    MyApp
    , HomePage
    , AboutPage
    , TabsPage
    , RendaPage
    , DespesaPage
    , EditPage
  ],
  imports: [
    BrowserModule
    , HttpClientModule
    , IntroPageModule
    , IonicModule.forRoot(MyApp)
    , IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    , HomePage
    , AboutPage
    , TabsPage
    , RendaPage
    , DespesaPage
    , EditPage
  ],
  providers: [
    StatusBar
    , SplashScreen
    , {
      provide: ErrorHandler
      , useClass: IonicErrorHandler
    }
    , BancoProvider
    , ConfigProvider
    , DatePipe
    , CurrencyPipe
  ]
})
export class AppModule { }
