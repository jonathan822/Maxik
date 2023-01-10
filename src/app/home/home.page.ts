import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../pages/modal/modal.page';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart.page';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  
  listaTiendas: any;
  listaProductos: any;

  constructor(private modalCtrl: ModalController, private router: Router) {
  }

  traerId(){

  }
  async abrirModal(){
    const modal= await this.modalCtrl.create({
      component: ModalPage,
      cssClass:'myclass',
    });
    await modal.present();
  }

  async gowallet(){
    this.router.navigate(['usuwallet/']);
  }


  async btnCarrito(){
    const modal= await this.modalCtrl.create({
      component: ShoppingCartPage,
      cssClass:'modalCarrito',
      backdropDismiss: true,
    });

    await modal.present();
  }

  async segmentChanged($event){
    let tipo = $event.detail.value;
    await this.router.navigate(['home/' + tipo]);
  }


}


 