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

  public rendaInsert(renda: Renda) {
    let key = this.datePipe.transform(new Date(), "ddMMyyyHHmmss");
    return this.rendaSave(key, renda);
  }

  public rendaUpdate(key: string, renda: Renda) {
    return this.rendaSave(key, renda);
  }

  private rendaSave(key: string, renda: Renda) {
    return this.storage.set(key, renda);
  }

  public rendaRemove(key: string) {
    return this.storage.remove(key);
  }

  public rendaGetAll() {
    let rendas: RendaList[] = [];

    return this.storage.forEach((value: Renda, key: string, iterationNumvber: number) => {
      let renda = new RendaList();
      renda.key = key;
      renda.renda = value;
      rendas.push(renda);
    })
      .then(() => {
        return Promise.resolve(rendas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public despesaInsert(despesa: Despesa) {
    let key = this.datePipe.transform(new Date(), "ddMMyyyHHmmss");
    return this.despesaSave(key, despesa);
  }

  public despesaUpdate(key: string, despesa: Despesa) {
    return this.despesaSave(key, despesa);
  }

  private despesaSave(key: string, despesa: Despesa) {
    return this.storage.set(key, despesa);
  }

  public despesaRemove(key: string) {
    return this.storage.remove(key);
  }

  public despesaGetAll() {
    let despesas: DespesaList[] = [];

    return this.storage.forEach((value: Despesa, key: string, iterationNumvber: number) => {
      let despesa = new DespesaList();
      despesa.key = key;
      despesa.despesa = value;
      despesas.push(despesa);
    })
      .then(() => {
        return Promise.resolve(despesas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Renda {
  renda: string;
  valor: number;
}

export class RendaList {
  key: string;
  renda: Renda;
}

export class Despesa {
  despesa: string;
  valor: number;
}

export class DespesaList {
  key: string;
  despesa: Despesa;
}