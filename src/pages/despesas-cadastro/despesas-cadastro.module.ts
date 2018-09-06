import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DespesasCadastroPage } from './despesas-cadastro';

@NgModule({
  declarations: [
    DespesasCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(DespesasCadastroPage),
  ],
})
export class DespesasCadastroPageModule {}
