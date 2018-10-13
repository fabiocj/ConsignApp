import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { BancoProvider } from '../banco/banco';

//let dados_key_name = "dados";

@Injectable()
export class DadosProvider {

  /*
  private dados = {
    selicDiaData: ""
    , selicDiaValor: ""
    , selicMesData: ""
    , selicMesValor: ""
    , selicAnoData: ""
    , selicAnoValor: ""
  }
  */

  constructor(
    public http: HttpClient
    //, private bancoProvider: BancoProvider
  ) {
    //console.log('Hello DadosProvider Provider');
  }

  // Recupera os dados do localstorage
  getDadosData(): any {
    //let dados_key_name = "dados";
    //console.log('hmmm: ', localStorage.getItem(dados_key_name));
    //return localStorage.getItem(dados_key_name);
  }

  // Grava os dados do localstorage
  setDadosData(/*
    selicDiaData: string
    , selicDiaValor: string
    , selicMesData: string
    , selicMesValor: string
    , selicAnoData: string
    , selicAnoValor: string*/
  ) {
    /*
    let dados = {
      selicDiaData: ""
      , selicDiaValor: ""
      , selicMesData: ""
      , selicMesValor: ""
      , selicAnoData: ""
      , selicAnoValor: ""
    };

    let selicDia = this.bancoProvider.getSelicDia().then(data => {
      console.log('Dados do getSelicDia: ', data);
      //do here what you want
    });
    let selicMes = this.bancoProvider.getSelicMes().then(data => {
      console.log('Dados do getSelicMes: ', data);
      //do here what you want
    });
    let selicAno = this.bancoProvider.getSelicAno().then(data => {
      console.log('Dados do getSelicAno: ', data);
      //do here what you want
    });

    localStorage.setItem(dados_key_name, JSON.stringify(dados));
    */
  }

}
