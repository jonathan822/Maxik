import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modi-product',
  templateUrl: './modi-product.page.html',
  styleUrls: ['./modi-product.page.scss'],
})
export class ModiProductPage implements OnInit {

  tienda: any;
  producto: any;

  prod: any = [
    {
      nombre: '',
      descripcion: '',
      precio: '',
      stock: ''
    }
  ]

  constructor(private dataService: DataService, private router: Router, private activeroute: ActivatedRoute, public toastController: ToastController) { 
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tienda = this.router.getCurrentNavigation().extras.state.idtienda;
        this.producto = this.router.getCurrentNavigation().extras.state.idProducto;
      }
    });
  }

  ngOnInit() {
    this.dataService.getProductoTienda(this.tienda, this.producto).subscribe(res =>
      this.prod = res)
    
  }

  modificar(){
    this.dataService.Updateproduct(this.tienda, this.producto, this.prod.nombre, this.prod.descripcion, this.prod.precio, this.prod.stock)
    this.router.navigate(['/homeadmin']);
    this.presentToast("Modificación Realizada")
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        cssClass: 'toast-wrapper.toast-bottom',
        message: message,
        position: 'bottom',
        duration: duration ? duration : 2000
      }
    );
    toast.present();
  }
}
