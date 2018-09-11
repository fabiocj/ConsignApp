import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

let config_key_name = "config";
let banco_despesas = "despesas";
let banco_rendas = "rendas";

@Injectable()
export class BancoProvider {

  private config = {
    showSlide: false
    , name: ""
    , username: ""
  }

  private renda = {
    nome: ""
    , valor: 0
  }

  private despesa = {
    nome: ""
    , valor: 0
  }

  constructor(
    public http: HttpClient
    , private nativeStorage: NativeStorage
  ) {
    console.log('Hello BancoProvider Provider');
  }

  buscarBanco() {

    return this.nativeStorage.getItem('myItem')
      .then(() => {
        console.log('Banco carregado com sucesso!');
      },
        error => console.error(error));

  }

  // Recupera os dados do localstorage
  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  // Gava os dados do localstorage
  setConfigData(showSlide?: boolean, name?: string, username?: string) {

    let config = {
      showSlide: false
      , name: ""
      , username: ""
    }

    if (showSlide) {
      config.showSlide = showSlide;
    }
    if (name) {
      config.name = name;
    }
    if (username) {
      config.username = username;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));

  }

}
