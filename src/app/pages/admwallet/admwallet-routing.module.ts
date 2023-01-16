import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmwalletPage } from './admwallet.page';

const routes: Routes = [
  {
    path: '',
    component: AdmwalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmwalletPageRoutingModule {}
