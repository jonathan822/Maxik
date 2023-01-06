import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { BuscarComponent } from '../components/buscar/buscar.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { DiscountsComponent } from '../components/discounts/discounts.component';
import { ProductsComponent } from '../components/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'products',
        component:ProductsComponent
      },
      {
        path:'buscar',
        component: BuscarComponent
      },
      {
        path:'categories',
        component: CategoriesComponent
      },
      {
        path:'discounts',
        component: DiscountsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
