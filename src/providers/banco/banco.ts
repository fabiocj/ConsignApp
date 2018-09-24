import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { resolveRendererType2 } from '@angular/core/src/view/util';

@Injectable()
export class BancoProvider {

  caixasRendas: CaixaList[];
  caixasDespesas: CaixaList[];
  public totalBancoRenda = 0;
  public totalBancoDespesa = 0;

  constructor(
    public storage: Storage
    , private datePipe: DatePipe
  ) {
    console.log('Hello BancoProvider Provider');
  }

  public insert(caixa: Caixa) {
    let key = this.datePipe.transform(new Date(), "ddMMyyyHHmmss");
    return this.save(key, caixa);
  }

  public update(key: string, caixa: Caixa) {
    return this.save(key, caixa);
  }

  private save(key: string, caixa: Caixa) {
    return this.storage.set(key, caixa);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {
    let caixas: CaixaList[] = [];

    return this.storage.forEach((value: Caixa, key: string, iterationNumvber: number) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;
      //console.log('Nome: ', caixa.caixa.caixa);
      //console.log('Valor: ', caixa.caixa.valor);
      //console.log('Tipo: ', caixa.caixa.tipo);
      caixas.push(caixa);
    })
      .then(() => {
        return Promise.resolve(caixas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getAllRenda() {
    let caixasRenda: CaixaList[] = [];

    return this.storage.forEach((value: Caixa, key: string, iterationNumvber: number) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;
      if (caixa.caixa.tipo == true) {
        caixasRenda.push(caixa);
      }
    })
      .then(() => {
        return Promise.resolve(caixasRenda);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getAllDespesa() {
    let caixasDespesa: CaixaList[] = [];

    return this.storage.forEach((value: Caixa, key: string, iterationNumvber: number) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;
      if (caixa.caixa.tipo == false) {
        caixasDespesa.push(caixa);
      }
    })
      .then(() => {
        return Promise.resolve(caixasDespesa);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  calculateTotals() {
    let totalPrice = 0;

    this.storage.forEach((value: Caixa, key: string, iterationNumvber: number) => {
      totalPrice += (value.valor * 1);
      console.log('valor no total: ', totalPrice);
    });

    return totalPrice;
  }

  calcularJuros(valorBase: number): Promise<number> {
    let total: number = 0;

    return new Promise((resolve, reject) => {
      this.storage.forEach((value: Caixa, key: string, iterationNumber: number) => {
        let caixa = new CaixaList();
        caixa.key = key;
        caixa.caixa = value;
        if (caixa.caixa.tipo == true) {
          total += (caixa.caixa.valor * 1);
        }
      })
      if (valorBase > 0) {
        let result: number = 0;
        let juros: number = 0.1;

        result = valorBase + (valorBase * juros);
        resolve(result);
      } else {
        reject('O valor não pode ser zero.');
      }
    });
  }

  public getValorRenda() {
    let total: number = 0;

    this.storage.forEach((value: Caixa, key: string, iterationNumber: number) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;
      if (caixa.caixa.tipo == true) {
        total = total + (caixa.caixa.valor * 1);
      }
    })
      .then(() => {
        //console.log('ta no then: ', total);
        console.log('resultado do total: ', total);
        return total;
      })
  }
}

export class Caixa {
  caixa: string;
  valor: number;
  tipo: boolean;
}

export class CaixaList {
  key: string;
  caixa: Caixa;
}