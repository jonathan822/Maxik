import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from '../../services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.page.html',
  styleUrls: ['./homeadmin.page.scss'],
})
export class HomeadminPage implements OnInit {

  handlerMessage ="";
  roleMessage ="";
  listaTiendas: any;
  listaProductos: any;
  tienda: any;
  prod: any = [
    {
      nombre: '',
      descripcion: '',
      precio: '',
      stock: ''
    }
  ]
  constructor(private dataService: DataService, private router: Router, private authenticationService: AuthenticationService, public alertController: AlertController,) {
    this.dataService.getTiendas().subscribe(res => {
      this.listaTiendas = res;
    })
  }

  ngOnInit() {
  }

  irAagregar(){
    let navigationExtras: NavigationExtras = {
      state: {idTienda: this.tienda}
    }
    console.log(this.tienda)
    this.router.navigate(['/new-product'], navigationExtras);

  }

  logout() {
    this.authenticationService.signOut();
    this.router.navigate(['/log-in']);
  }

  listarProductos(event) {
    this.dataService.getProductosTienda(event.target.value.id).subscribe(res => {
      this.tienda = event.target.value.id;
      this.listaProductos = res
    })
  }

  eliminar(id) {
    this.dataService.eliminarProducto1(id, this.tienda).then(res => {
    }).catch(err => {
      console.log("ERRO AL ELIMINAR", err);

    });
  }

  async presentAlert(id) {
    const alert = await this.alertController.create({
      header: '¿Eliminar Producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => { this.dataService.eliminarProducto1(id, this.tienda); }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = ` ${role}`;
  }

  modi(idProducto){
    let navigationExtras: NavigationExtras={ state: {idtienda: this.tienda, idProducto}}
    this.router.navigate(['/modi-product'], navigationExtras);


}
  }