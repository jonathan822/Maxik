import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModiProductPageRoutingModule } from './modi-product-routing.module';

import { ModiProductPage } from './modi-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModiProductPageRoutingModule
  ],
  declarations: [ModiProductPage]
})
export class ModiProductPageModule {}
