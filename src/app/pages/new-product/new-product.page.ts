import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  id:any;
  newp: any ={
    name:'',
    des:'',
    prec: '',
    stok: '',
  };

  Validmessage = 0

  constructor(private DataService: DataService, public toastController: ToastController, private router: Router, private activeroute: ActivatedRoute) { 
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.idTienda;
      }
    });
  }

  ngOnInit() {
    console.log(this.id)
  }

  /*async btnCreateProd() {
    if (this.newp.nombre == "") {
      this.presentToast("El campo de nombre esta incompleto");
    } else if (this.newp.descripcion == "") {
      this.presentToast("El campo de apellido esta incompleto");
    } else if (this.newp.precio == "") {
      this.presentToast("El campo de email esta incompleto");
    } else if (this.newp.stock == "") {
      this.presentToast("El campo de contraseña esta incompleto");
    } else if (this.newp.nombre == "" || this.newp.descripcion == "" || this.newp.precio == "" || this.newp.stock == "") {
      this.Validmessage = 1
    }
    else {
      this.Validmessage = 0
      await this.AuthenticationService.createUser(this.newUserFields.email, this.newUserFields.password);
      await this.DataService.createFirebaseProd(await this.AuthenticationService.getUid(), this.newUserFields.name, this.newUserFields.surname)
    }

  }*/

  SaveProduct(){
    this.DataService.createProduct(this.id, this.newp.name, this.newp.desc, this.newp.prec, this.newp.stok).then(res => {
      this.router.navigate(['/homeadmin']);
    })
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration ? duration : 2000
      }
    );
    toast.present();
  }
}
