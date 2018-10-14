import { Injectable } from '@angular/core';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  constructor(
  ) {
    //console.log('Hello ConfigProvider Provider');
  }

  // Recupera os dados do localstorage
  getConfigData(): any {

    let config_key_name = "config";
    return localStorage.getItem(config_key_name);
  }

  // Grava os dados do localstorage
  setConfigData(showSlide?: boolean) {

    let config = {
      showSlide: false
    };
    
    if (showSlide) {
      config.showSlide = showSlide;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));
  }


}