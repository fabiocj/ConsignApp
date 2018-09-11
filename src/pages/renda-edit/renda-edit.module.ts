import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RendaEditPage } from './renda-edit';

@NgModule({
  declarations: [
    RendaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RendaEditPage),
  ],
})
export class RendaEditPageModule {}
