/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-cond-assign */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  newUserFields = {
    name: '',
    surname: '',
    rut: '',
    email: '',
    password: '',
    confirmpassword: ''
  }

  Validmessage = 0

  constructor(private router: Router, private AuthenticationService: AuthenticationService, private DataService: DataService, public toastController: ToastController) { }

  ngOnInit() {
  }

  async btnCreateUser() {
    if (this.newUserFields.name == "") {
      this.presentToast("El campo de nombre esta incompleto");
    } else if (this.newUserFields.surname == "") {
      this.presentToast("El campo de apellido esta incompleto");
    } else if (this.newUserFields.email == "") {
      this.presentToast("El campo de Rut esta incompleto");
    } else if (this.newUserFields.rut == "") {
      this.presentToast("El campo de email esta incompleto");
    } else if (this.newUserFields.password == "") {
      this.presentToast("El campo de contraseña esta incompleto");
    } else if (this.newUserFields.confirmpassword == "") {
      this.presentToast("El campo de repetir contraseña esta incompleto");
    } else if (this.newUserFields.name == "" || this.newUserFields.surname == "" || this.newUserFields.email == "" || this.newUserFields.rut == "" || this.newUserFields.password == "" || this.newUserFields.confirmpassword == "") {
      this.Validmessage = 1

    }
    else if (this.newUserFields.password != this.newUserFields.confirmpassword) {
      this.Validmessage = 2

    }
    else {
      this.Validmessage = 0
      await this.AuthenticationService.createUser(this.newUserFields.email, this.newUserFields.password);
      await this.DataService.createFirebaseUser(await this.AuthenticationService.getUid(), this.newUserFields.name, this.newUserFields.surname, this.newUserFields.rut)
      this.router.navigate(['log-in'])
    }

  }

  Iralogin() {
    this.router.navigate(['/log-in']);
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
