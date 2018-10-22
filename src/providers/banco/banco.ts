import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

@Injectable()
export class BancoProvider {
  basepath = "/bancoapi";

  constructor(
    public storage: Storage
    , private datePipe: DatePipe
    , public http: HttpClient
    , private _platform: Platform
  ) {
    if (this._platform.is("mobile")) {
      this.basepath = "https://api.bcb.gov.br";
    }
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

  public getAllRenda() {
    let caixas: CaixaList[] = [];

    return this.storage.forEach((value: Caixa, key: string) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;
      if (caixa.caixa.ehRenda == true) {
        caixas.push(caixa);
      }
    })
      .then(() => {
        //localStorage.setItem('totalRenda', String(this.totalRenda));
        return Promise.resolve(caixas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getAllDespesa() {
    let caixas: CaixaList[] = [];

    return this.storage.forEach((value: Caixa, key: string) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;
      if (caixa.caixa.ehRenda == false) {
        caixas.push(caixa);
      }
    })
      .then(() => {
        //localStorage.setItem('totalDespesa', String(this.totalDespesa));
        //localStorage.setItem('totalConsignado', String(this.totalConsignado));
        return Promise.resolve(caixas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public hardReset() {
    this.storage.clear().then(() => {
    });
  }

  calcular() {
    let totalRenda = Number(localStorage.getItem("totalRenda"));
    let totalDespesa = Number(localStorage.getItem("totalDespesa"));
    let totalConsignado = Number(localStorage.getItem("totalConsignado"));
    let valorSaldo = Number(localStorage.getItem("valorSaldo"));
    let valorPercComprometido = Number(localStorage.getItem("valorPercDisponivel"));
    let valorPercDisponivel = Number(localStorage.getItem("valorPercComprometido"));

    valorSaldo = totalRenda - (totalDespesa + totalConsignado);
    if (totalRenda <= 0) {
      valorPercComprometido = null;
      valorPercDisponivel = null;
    } else {
      valorPercComprometido = ((totalDespesa + totalConsignado) / totalRenda);
      valorPercDisponivel = (1 - valorPercComprometido);
    }

    localStorage.setItem('valorSaldo', String(valorSaldo));
    localStorage.setItem('valorPercComprometido', String(valorPercComprometido));
    localStorage.setItem('valorPercDisponivel', String(valorPercDisponivel));
  }

  loadSelicDia() {
    let data: Observable<any>;
    return data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json');
  }

  loadSelicMes() {
    let data: Observable<any>;
    return data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados/ultimos/1?formato=json');
  }

  loadSelicAno() {
    let data: Observable<any>;
    return data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos/1?formato=json');
  }

  //Taxa média mensal de juros das operações de crédito com recursos livres - Pessoas físicas - Crédito pessoal consignado para trabalhadores do setor privado
  loadCredPesConsigSetorPrivado() {
    let data: Observable<any>;
    return data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.25466/dados/ultimos/1?formato=json');
  }

  //Taxa média mensal de juros das operações de crédito com recursos livres - Pessoas físicas - Crédito pessoal consignado para aposentados e pensionistas do INSS
  loadCredPesConsigAposPenINSS() {
    let data: Observable<any>;
    return data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.25468/dados/ultimos/1?formato=json');
  }

  //Taxa média mensal de juros das operações de crédito com recursos livres - Pessoas físicas - Crédito pessoal consignado total
  loadCredPesConsigTotal() {
    let data: Observable<any>;
    return data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.25469/dados/ultimos/1?formato=json');
  }

  //Taxa média mensal de juros das operações de crédito com recursos livres - Pessoas físicas - Crédito pessoal não consignado
  loadCredPesNaoConsig() {
    let data: Observable<any>;
    return data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.25464/dados/ultimos/1?formato=json');
  }
  //Taxa média mensal de juros das operações de crédito com recursos livres - Pessoas físicas - Cheque especial
  loadChequeEspecial() {
    let data: Observable<any>;
    return data = this.http.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.25463/dados/ultimos/1?formato=json');
  }

}

export class Caixa {
  descricao: string;
  valor: number;
  ehRenda: boolean;
  ehConsignado: boolean;
}

export class CaixaList {
  key: string;
  caixa: Caixa;
}

