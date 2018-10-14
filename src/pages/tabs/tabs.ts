import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { DespesaPage } from '../despesa/despesa';
import { RendaPage } from '../renda/renda';
import { ConsultaPage } from '../consulta/consulta';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RendaPage;
  tab3Root = DespesaPage;
  tab4Root = ConsultaPage;
  tab5Root = AboutPage;

  constructor() {
  }
}