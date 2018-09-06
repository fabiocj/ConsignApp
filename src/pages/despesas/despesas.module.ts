import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DespesasPage } from './despesas';

@NgModule({
  declarations: [
    DespesasPage,
  ],
  imports: [
    IonicPageModule.forChild(DespesasPage),
  ],
})
export class DespesasPageModule {}
