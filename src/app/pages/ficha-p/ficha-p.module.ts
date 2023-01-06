import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FichaPPageRoutingModule } from './ficha-p-routing.module';
import { FichaPPage } from './ficha-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaPPageRoutingModule
  ],
  declarations: [FichaPPage]
})
export class FichaPPageModule {}
