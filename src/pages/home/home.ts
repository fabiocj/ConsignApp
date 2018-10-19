import { Component, ViewChild } from '@angular/core';
import { BancoProvider } from '../../providers/banco/banco';
import { CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('totalRendas') totalRendas;
  @ViewChild('totalDespesas') totalDespesas;
  @ViewChild('totalConsignados') totalConsignados;
  @ViewChild('valorRestante') valorRestante;
  @ViewChild('percRendaDisponivel') percRendaDisponivel;
  @ViewChild('percRendaComprometido') percRendaComprometido;
  variavelCor: string;

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
    let totalRenda: number;
    let totalDespesa: number;
    let totalConsignado: number;
    let valorRestante: number;
    let valorPercDisponivel: number;
    let valorPercComprometido: number;

    this.bancoProvider.getAll();

    totalRenda = Number(localStorage.getItem("totalRenda"));
    totalDespesa = Number(localStorage.getItem("totalDespesa"));
    totalConsignado = Number(localStorage.getItem("totalConsignado"));
    valorRestante = Number(localStorage.getItem("valorRestante"));
    valorPercDisponivel = Number(localStorage.getItem("valorPercDisponivel"));
    valorPercComprometido = Number(localStorage.getItem("valorPercComprometido"));

    this.totalRendas = this.getCurrency(totalRenda);
    this.totalDespesas = this.getCurrency(totalDespesa);
    this.totalConsignados = this.getCurrency(totalConsignado);
    this.valorRestante = this.getCurrency(valorRestante);
    this.percRendaComprometido = this.getPercent(valorPercComprometido);
    this.percRendaDisponivel = this.getPercent(valorPercDisponivel);
    
    if (valorPercDisponivel >= 0.4) {
      this.variavelCor = '#33B55B';
    } else if ((valorPercDisponivel < 0.4) && (valorPercDisponivel >= 0.15)){
      this.variavelCor = 'orange';
    } else if (valorPercDisponivel < 0.15) {
      this.variavelCor = 'red';
    } else {
      this.variavelCor = '#33B55B';
    }

  }
}
