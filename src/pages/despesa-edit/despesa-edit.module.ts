import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DespesaEditPage } from './despesa-edit';

@NgModule({
  declarations: [
    DespesaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DespesaEditPage),
  ],
})
export class DespesaEditPageModule {}
