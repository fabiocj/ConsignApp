import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { BrMaskerModule } from 'brmasker-ionic-3';

import { MyApp } from './app.component';
import { BancoProvider } from '../providers/banco/banco';
import { ConfigProvider } from '../providers/config/config';
import { IntroPageModule } from '../pages/intro/intro.module';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe, CurrencyPipe, PercentPipe, DecimalPipe } from '@angular/common';
import { RendaPage } from '../pages/renda/renda';
import { DespesaPage } from '../pages/despesa/despesa';
import { EditPage } from '../pages/edit/edit';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { DadosProvider } from '../providers/dados/dados';
import { ConsultaPage } from '../pages/consulta/consulta';
//registerLocaleData(ptBr);
registerLocaleData(ptBr, 'pt-BR');

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    MyApp
    , HomePage
    , AboutPage
    , TabsPage
    , RendaPage
    , DespesaPage
    , EditPage
    , ConsultaPage
  ],
  imports: [
    BrowserModule
    , HttpClientModule
    , IntroPageModule
    , CurrencyMaskModule
    , BrMaskerModule
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
    , ConsultaPage
  ],
  providers: [
    StatusBar
    , SplashScreen
    , { provide: ErrorHandler, useClass: IonicErrorHandler }
    //, { provide: LOCALE_ID, useValue: 'pt-PT' }
    , { provide: LOCALE_ID, useValue: 'pt-BR' }
    , { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    , BancoProvider
    , ConfigProvider
    , DatePipe
    , CurrencyPipe
    , PercentPipe
    , DecimalPipe
    , DadosProvider
  ]
})
export class AppModule { }
