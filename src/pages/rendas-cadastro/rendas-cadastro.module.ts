import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RendasCadastroPage } from './rendas-cadastro';

@NgModule({
  declarations: [
    RendasCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(RendasCadastroPage),
  ],
})
export class RendasCadastroPageModule {}
