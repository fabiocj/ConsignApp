import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaixaEditPage } from './caixa-edit';

@NgModule({
  declarations: [
    CaixaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CaixaEditPage),
  ],
})
export class CaixaEditPageModule {}
