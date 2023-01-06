import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModiProductPage } from './modi-product.page';

const routes: Routes = [
  {
    path: '',
    component: ModiProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModiProductPageRoutingModule {}
