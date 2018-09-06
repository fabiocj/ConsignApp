import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RendasPageModule } from '../pages/rendas/rendas.module';
import { RendasCadastroPageModule } from '../pages/rendas-cadastro/rendas-cadastro.module';
import { DespesasPageModule } from '../pages/despesas/despesas.module';
import { DespesasCadastroPageModule } from '../pages/despesas-cadastro/despesas-cadastro.module';
import { BancoProvider } from '../providers/banco/banco';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp
    , HomePage
  ],
  imports: [
    BrowserModule
    , HttpClientModule
    , BrMaskerModule
    , RendasPageModule
    , DespesasPageModule
    , DespesasCadastroPageModule
    , RendasCadastroPageModule
    , IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
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
  ]
})
export class AppModule { }
