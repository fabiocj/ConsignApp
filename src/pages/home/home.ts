import { Component, ViewChild } from '@angular/core';
import { ToastOptions } from 'ionic-angular';
import { BancoProvider } from '../../providers/banco/banco';
import { CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public toastOptions: ToastOptions;
  public toastMessage: string;

  @ViewChild('totalRendas') totalRendas;
  @ViewChild('totalDespesas') totalDespesas;
  @ViewChild('totalConsignado') totalConsignado;
  @ViewChild('restanteValor') restanteValor;
  @ViewChild('percRendaDisponivel') percRendaDisponivel;
  @ViewChild('percRendaComprometida') percRendaComprometida;
  valorDisponivel: number;

  constructor(
    private bancoProvider: BancoProvider
    , private currencyPipe: CurrencyPipe
    , private percentPipe: PercentPipe
  ) {
  }

  getCurrency(valor: number) {
    return this.currencyPipe.transform(valor, 'BRL', 'symbol', '1.2');
  }

  getPercent(valor: number) {
    return this.percentPipe.transform(valor, '1.2');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomePage');
  }

  ionViewDidEnter() {
    let valorRendas: number;
    let valorDespesas: number;
    let valorConsignado: number;
    let valorRestante: number;
    let valorPercDisponivel: number;
    let valorPercComprometida: number;

    this.bancoProvider.getAll();

    valorRendas = Number(localStorage.getItem("totalRenda"));
    valorDespesas = Number(localStorage.getItem("totalDespesa"));
    valorConsignado = Number(localStorage.getItem("totalConsignado"));
    valorRestante = valorRendas - (valorDespesas + valorConsignado);
    if (valorRendas <= 0) {
      valorPercComprometida = null;
      valorPercDisponivel = null;
    } else {
      valorPercComprometida = ((valorDespesas + valorConsignado) / valorRendas);
      valorPercDisponivel = (1 - valorPercComprometida);
    }

    this.totalRendas = this.getCurrency(valorRendas);
    this.totalDespesas = this.getCurrency(valorDespesas);
    this.totalConsignado = this.getCurrency(valorConsignado);
    this.restanteValor = this.getCurrency(valorRestante);
    this.percRendaComprometida = this.getPercent(valorPercComprometida);
    this.percRendaDisponivel = this.getPercent(valorPercDisponivel);

    this.valorDisponivel = valorPercDisponivel;
  }

  itemClick(itemid: number) {
    alert(itemid);
  }

}
