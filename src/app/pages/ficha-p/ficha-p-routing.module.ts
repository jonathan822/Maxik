import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaPPage } from './ficha-p.page';

const routes: Routes = [
  {
    path: '',
    component: FichaPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaPPageRoutingModule {}
