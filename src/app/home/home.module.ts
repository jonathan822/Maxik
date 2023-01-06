import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { BuscarComponent } from '../components/buscar/buscar.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { DiscountsComponent } from '../components/discounts/discounts.component';
import { ProductsComponent } from '../components/products/products.component';

import { HomePageRoutingModule } from './home-routing.module';
import {SwiperModule } from "swiper/angular"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule
  ],
  declarations: [HomePage, ProductsComponent, BuscarComponent, CategoriesComponent, DiscountsComponent]
})
export class HomePageModule {}
