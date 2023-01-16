import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuwalletPage } from './usuwallet.page';

const routes: Routes = [
  {
    path: '',
    component: UsuwalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuwalletPageRoutingModule {}
