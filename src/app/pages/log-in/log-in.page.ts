import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  loginForm = {
    email: "",
    password: ""
  }

  uid: any;

  constructor(private DataService: DataService, private router: Router, private AuthenticationService: AuthenticationService, public toastController: ToastController) { }

  IraSignin() {
    this.router.navigate(['/sign-in']);
  }

  ngOnInit() {
  }

  async btnEntrar() {
    if (this.loginForm.email == "") {
      this.presentToast("El campo de email esta incompleto");
    } else if (this.loginForm.password == "") {
      this.presentToast("El campo de contraseña esta incompleto");
    } else {
      await this.AuthenticationService.logIn(this.loginForm.email, this.loginForm.password)
        .then(() => this.test())
        .catch((e) => console.log(e.message));
    }
  };

  test() {
    this.DataService.getUsuario(this.AuthenticationService.getUid()).subscribe(event => this.uid = event);
    let hideFooterTimeout = setTimeout(() => {
      if (this.uid.tipou == 1) {
        this.router.navigate(['/homeadmin']);
      } else if (this.uid.tipou == 2) {
        this.router.navigate(['/homevende']);
      } else {
        this.router.navigate(['/home']);
      }
    }, 2000);
    
    /*if (this.uid.tipou == 1) {
      this.router.navigate(['/homeadmin']);
    } else if (this.uid.tipou == 2) {
      this.router.navigate(['/homevende']);
    } else {
      this.router.navigate(['/home']);
    }*/
  }


  IraReset() {
    this.router.navigate(['/reset-pass']);
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
