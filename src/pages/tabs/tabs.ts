import { Component } from '@angular/core';

import { FoodPage } from '../food/food';
import { JobsPage } from '../jobs/jobs';
import { DahaPage } from '../daha/daha';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FoodPage;
  tab2Root = JobsPage;
  tab3Root = DahaPage;

  constructor() {

  }
}
