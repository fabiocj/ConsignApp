import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BancoProvider, Caixa } from '../../providers/banco/banco';

@IonicPage()
@Component({
  selector: 'page-edit'
  , templateUrl: 'edit.html'
  , providers: [
  ]
})
export class EditPage {
  public mostrarConsignado: boolean = false;
  model: Caixa;
  key: string;
  valorEditar: number;
  origem: string;
  transacao: string;
  ehRenda: boolean;
  ehConsignado: boolean = false;
  botaoDesabilitado: boolean;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private bancoProvider: BancoProvider
    , private toastCtrl: ToastController
  ) {
    this.origem = navParams.get('origem');
    this.transacao = navParams.get('transacao');
    if (navParams.get('valor') == null) {
      this.valorEditar = 0;
    } else {
      this.valorEditar = navParams.get('valor');
    }

    if (this.origem == "Renda") {
      this.ehRenda = true;
      this.botaoDesabilitado = true;
      this.mostrarConsignado = false;
    } else {
      this.ehRenda = false;
      this.botaoDesabilitado = false;
      this.mostrarConsignado = true;
    }

    if (this.navParams.data.caixa && this.navParams.data.key) {
      this.model = this.navParams.data.caixa;
      this.ehConsignado = this.model.ehConsignado;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Caixa();
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditPage');
  }

  mudaConsignado() {
    this.ehConsignado = !this.ehConsignado;
  }

  save() {
    let valorRendas: number = (Number(localStorage.getItem("totalRenda")));
    let valorDespesas: number = (Number(localStorage.getItem("totalDespesa")));
    let valorConsignados: number = (Number(localStorage.getItem("totalConsignado")));
    let maxConsignado: number = valorRendas * 0.35;

    if (this.model.valor < 0) {
      //VALORES PRECISAM SER MAIORES QUE 0
      this.toastCtrl.create({
        message: 'Por favor, os valores informados precisam ser maiores que zero!'
        , duration: 2000
        , position: 'bottom'
      }).present();
    } else if (this.model.descricao == null || this.model.descricao == '') {
      //OS CAMPOS PRECISAM SER PREENCHIDOS
      this.toastCtrl.create({
        message: 'Por favor, informar um Nome para a ' + this.origem + '!'
        , duration: 2000
        , position: 'bottom'
      }).present();
    } else if (this.model.valor == null || this.model.valor == 0) {
      //O CAMPO VALOR PRECISA SER VÁLIDO
      this.toastCtrl.create({
        message: 'Por favor, informar um Valor para a ' + this.origem + '!'
        , duration: 2000
        , position: 'bottom'
      }).present();
    } else if ((this.origem == "Despesa") && (this.model.ehConsignado == true) && (this.model.valor >= maxConsignado)) {
      //CONSIGNADO NÃO PODE PASSAR DE 35%
      this.toastCtrl.create({
        message: 'Um Consignado não pode ultrapassar a 35% de sua Renda Total!'
        , duration: 2000
        , position: 'bottom'
      }).present();
    } else {
      //ESTÁ OK
      this.saveCaixa()
        .then(() => {
          let mensagemExtra = '';
          if ((valorRendas <= 0) && (this.origem == "Despesa")) {
            mensagemExtra = 'Considere adicionar alguma Renda para equilibrar as Contas!';
          }
          this.toastCtrl.create({
            message: this.origem + ' salva! ' + mensagemExtra
            , duration: 2000
            , position: 'bottom'
          }).present();
          if (this.transacao == "Editar") {

          }
          if (this.origem == "Renda") {
            valorRendas += (this.model.valor * 1) - this.valorEditar;
            localStorage.setItem('totalRenda', String(valorRendas));
          } else if ((this.origem == "Despesa") && (this.model.ehConsignado == false))  {
            valorDespesas += (this.model.valor * 1) - this.valorEditar;
            localStorage.setItem('totalDespesa', String(valorDespesas));
          } else {
            valorConsignados += (this.model.valor * 1) - this.valorEditar;
            localStorage.setItem('totalConsignado', String(valorConsignados));
          }

          this.navCtrl.pop();
        })
        .catch(() => {
          this.toastCtrl.create({
            message: 'Erro ao salvar a ' + this.origem + '!'
            , duration: 2000
            , position: 'bottom'
          }).present();
        })
      //this.bancoProvider.getAll();
    }
  }

  private saveCaixa() {
    this.model.ehConsignado = this.ehConsignado;
    this.model.ehRenda = this.ehRenda;
    if (this.key) {
      return this.bancoProvider.update(this.key, this.model);
    } else {
      return this.bancoProvider.insert(this.model);
    }
  }

}
