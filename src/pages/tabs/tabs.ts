import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { DespesasPage } from '../despesas/despesas';
import { RendasPage } from '../rendas/rendas';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RendasPage;
  tab3Root = DespesasPage;

  constructor() {

  }
}