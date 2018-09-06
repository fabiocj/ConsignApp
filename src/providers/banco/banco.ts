import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the BancoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BancoProvider {

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

}
