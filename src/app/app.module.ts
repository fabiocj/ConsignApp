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
import { BancoProvider } from '../providers/banco/banco';
import { NativeStorage } from '@ionic-native/native-storage';
import { ConfigProvider } from '../providers/config/config';
import { IntroPageModule } from '../pages/intro/intro.module';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { RendaPageModule } from '../pages/renda/renda.module';
import { DespesaPageModule } from '../pages/despesa/despesa.module';
import { RendaEditPageModule } from '../pages/renda-edit/renda-edit.module';
import { DespesaEditPageModule } from '../pages/despesa-edit/despesa-edit.module';
import { RendaEditPage } from '../pages/renda-edit/renda-edit';
import { DespesaEditPage } from '../pages/despesa-edit/despesa-edit';

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
    , RendaPageModule
    , RendaEditPageModule
    , DespesaPageModule
    , DespesaEditPageModule
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
  ],
  providers: [
    StatusBar
    , SplashScreen
    , {
      provide: ErrorHandler
      , useClass: IonicErrorHandler
    }
    , BancoProvider
    , NativeStorage
    , ConfigProvider
    , DatePipe
  ]
})
export class AppModule { }
