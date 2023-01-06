import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ficha-p',
  templateUrl: './ficha-p.page.html',
  styleUrls: ['./ficha-p.page.scss'],
})
export class FichaPPage implements OnInit {

  cant = 1;
  ficha: any = [
    {
      descripcion: '',
      id: '',
      nombre: '',
      precio: '',
      stock: ''
    }
  ]

  @Input() producto: any;
  @Input() tienda: any;

  constructor(private modalCtrl: ModalController, private router: Router, private DataService: DataService, private toastController: ToastController) {
  }

  async ngOnInit() {
    await this.getProducto();
  }

  getProducto(){
    this.DataService.getProductoTienda(this.tienda, this.producto).subscribe(res => {
      this.ficha = res;
    })
  }

  async volver() {
    this.router.navigate(['/home']);
    await this.modalCtrl.dismiss();
  }

  incrementQty() {
    this.cant++;
  }

  decrementQty() {
    if (this.cant != 1){
      this.cant--;
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto agregado al carrito de compra',
      duration: 2000
    });
    toast.present();
  }

  async btnAgregarCarrito() {
    await this.DataService.cargarId();
    await this.DataService.agregarProducto(this.producto, this.tienda, this.cant)
    await this.modalCtrl.dismiss();
    await this.presentToast();
  }
}
