import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  paginaActual : string = "CarritoPag";
  carrito: any = []
  subtotal: number = 0;
  animacion: boolean = false;
  metodoDePago: any;

  constructor(private modalCtrl: ModalController, private AuthenticationService: AuthenticationService, private dataService: DataService) {
    this.dataService.cargarId();
    this.dataService.getCarrito(this.AuthenticationService.getUid()).subscribe(res => {
      this.carrito = res;
    })
  }

  ngOnInit() {
    let TIME_IN_MS = 500;
    let hideFooterTimeout = setTimeout(() => {
      this.sumador();
    }, TIME_IN_MS);
  }

  async cerrar() {
    await this.modalCtrl.dismiss();
  }

  btnEliminar(idProducto) {
    this.dataService.eliminarProducto(idProducto);
    let TIME_IN_MS = 300;
    let hideFooterTimeout = setTimeout(() => {
      this.sumador();
    }, TIME_IN_MS);
  }

  sumador() {
    var result = this.carrito.reduce((a, curr) => a + curr.precio * curr.cantidad, 0);
    this.subtotal = result
  }


  sumar(idProducto, cantidadActual){
    this.dataService.actualizarCantidad((cantidadActual+1), idProducto)
    let TIME_IN_MS = 300;
    let hideFooterTimeout = setTimeout(() => {
      this.sumador();
    }, TIME_IN_MS);
  }

  restar(idProducto, cantidadActual){
    this.dataService.actualizarCantidad((cantidadActual-1), idProducto)
    let TIME_IN_MS = 300;
    let hideFooterTimeout = setTimeout(() => {
      this.sumador();
    }, TIME_IN_MS);
  }

  confirmarCompra(){
    this.animacion = true;
    this.dataService.crearHistorial(this.carrito)
  }
}
