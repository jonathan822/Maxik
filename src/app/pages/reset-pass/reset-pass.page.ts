/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {
  EmailForm={
    email:""
  }


  constructor(public AuthenticationService: AuthenticationService, public toastController: ToastController) { }

  ngOnInit() {
  }

  resetPass(){
    if(this.EmailForm.email == ""){
    this.presentToast("El campo de email esta incompleto");
  }else{
    this.AuthenticationService.resetPassword(this.EmailForm.email)
    console.log('Correo enviado');
    }
  }

  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }
}
