import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

@Injectable()
export class BancoProvider {
  private totalRenda: number = 0;
  private totalDespesa: number = 0;
  resultado: number = 0;
  caixasRendas: CaixaList[];
  caixasDespesas: CaixaList[];
  totalBancoRenda = 0;
  totalBancoDespesa = 0;

  public items: any;

  baseSELIC: string = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json';

  // SELIC ao Dia
  public selicADData: any;
  public selicADValor: any;
  // SELIC ao Mês
  public selicAMData: any;
  public selicAMValor: any;
  // SELIC ao Ano
  public selicAAData: any;
  public selicAAValor: any;

  basepath = "/bancoapi";

  constructor(
    public storage: Storage
    , private datePipe: DatePipe
    , public http: HttpClient
    , private _platform: Platform
  ) {
    console.log('Hello BancoProvider Provider');

    console.log("Plataforma: ", this._platform);
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

  public getAll() {
    this.totalRenda = 0;
    this.totalDespesa = 0;
    let caixas: CaixaList[] = [];

    return this.storage.forEach((value: Caixa, key: string, iterationNumvber: number) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;
      if (caixa.caixa.ehRenda == true) {
        this.totalRenda += (caixa.caixa.valor * 1);
      } else {
        this.totalDespesa += (caixa.caixa.valor * 1);
      }
      caixas.push(caixa);
    })
      .then(() => {
        //console.log('totalRenda: R$', this.totalRenda);
        //console.log('totalDespesa: R$', this.totalDespesa);
        localStorage.setItem('totalRenda', String(this.totalRenda));
        localStorage.setItem('totalDespesa', String(this.totalDespesa));
        return Promise.resolve(caixas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getAllRenda() {
    this.totalRenda = 0;
    let caixas: CaixaList[] = [];

    return this.storage.forEach((value: Caixa, key: string, iterationNumvber: number) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;
      if (caixa.caixa.ehRenda == true) {
        this.totalRenda += (caixa.caixa.valor * 1);
        caixas.push(caixa);
      }
    })
      .then(() => {
        localStorage.setItem('totalRenda', String(this.totalRenda));
        return Promise.resolve(caixas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getAllDespesa() {
    this.totalDespesa = 0;
    let caixas: CaixaList[] = [];

    return this.storage.forEach((value: Caixa, key: string, iterationNumvber: number) => {
      let caixa = new CaixaList();
      caixa.key = key;
      caixa.caixa = value;
      if (caixa.caixa.ehRenda == false) {
        this.totalDespesa += (caixa.caixa.valor * 1);
        caixas.push(caixa);
      }
    })
      .then(() => {
        localStorage.setItem('totalDespesa', String(this.totalDespesa));
        return Promise.resolve(caixas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public calculaTotal() {
    this.getAll();
    console.log('total Rendas: ', localStorage.getItem("totalRenda"));
    console.log('total Despesas: ', localStorage.getItem("totalDespesa"));
  }

  public hardReset() {
    this.storage.clear().then(() => {
      console.log('Todos os dados foram apagados!');
      console.log('Feliz WIPE novo!');
    });
  }

  /*
  loadDataCIDATA() {
    let data: Observable<any>;
    data = this.http.get(this.baseSELIC);
    console.log('baseDadosAbertos: ', data);
    data.subscribe(results => {
      this.items = results;
    })
  }
  */

  loadDataCIDATA(selic: string) {
    //this.bancoProvider.loadDataCIDATA();
    let data: Observable<any>;
    let link: string;
    let resultados: any = [];
    //Taxa de Juros SELIC A.D.: https://dadosabertos.bcb.gov.br/dataset/11-taxa-de-juros---selic
    //Taxa de Juros SELIC A.M.: https://dadosabertos.bcb.gov.br/dataset/4390-taxa-de-juros---selic-acumulada-no-mes
    //Taxa de Juros SELIC A.A.: https://dadosabertos.bcb.gov.br/dataset/1178-taxa-de-juros---selic-anualizada-base-252

    if (selic == 'dia') {
      link = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json';
    } else if (selic == 'mes') {
      link = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados/ultimos/1?formato=json';
    } else if (selic == 'ano') {
      link = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos/1?formato=json';
    }
    //data = this.http.get(`${this.basepath}/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json`);
    data = this.http.get(link);

    data.subscribe(results => {
      this.items = results;
      console.log('SELIC ao Dia: ', this.items);
      //return this.items;
      this.selicADData = this.items[0].data;
      this.selicADValor = this.items[0].valor;
      resultados.data = this.selicADData;
      resultados.valor = this.selicADValor;
      console.log('SELIC ao Dia Data: ', resultados.data);
      console.log('SELIC ao Dia Valor: ', resultados.valor);
    })
    return resultados;

    /*
    console.log('baseDadosAbertos: ', data);
    data.subscribe(results => {
      this.items = results;
    })
    */


  }

}

export class Caixa {
  descricao: string;
  valor: number;
  ehRenda: boolean;
}

export class CaixaList {
  key: string;
  caixa: Caixa;
}

export class Resultado {
  data: string;
  valor: string;
}