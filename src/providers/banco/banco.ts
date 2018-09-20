import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class BancoProvider {

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
      //console.log('valor no total: ', totalPrice);
    });
    
    return totalPrice;
  }

  public getValorRenda() {
    let caixasRenda: CaixaList[] = [];
    let total: number = 0;

    this.storage.forEach((value: Caixa, key: string, iterationNumvber: number) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;

      if (caixa.caixa.tipo == false) {
        caixasRenda.push(caixa);
      }
    })
      .then(() => {
        //Promise.resolve(caixasRenda);
        for (let entry of caixasRenda) {
          //console.log(entry);
          total = ((total * 1) + (entry.caixa.valor * 1));
          //console.log(total);
        }
        console.log(total);
      });
    /*
        console.log('Entrou aqui');
        let total: number = 0;
        console.log('Total inicio: ', total);
        this.bancoProvider.getAllRenda()
          .then(results => {
            this.caixas = results;
            for (let entry of this.caixas) {
              console.log(entry); // 1, "string", false
              total = ((total * 1) + (entry.caixa.valor * 1));
            }
            console.log('Total for: ', total);
          });
        this.rendas = total;
    
      }
      */
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