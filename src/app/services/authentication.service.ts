import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { updateEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth, private alertCtrl: AlertController, private router: Router) { }

  async createUser(email, password) {
    await createUserWithEmailAndPassword(this.auth, email, password).then(auth => {
      console.log('Cuenta Creada Correctamente');
    }).catch(error => {
      if (error.code == 'auth/email-already-in-use') {
        console.log('Correo ya se encuentra en uso')
      } else {
        console.error(error)
      }
    })
  }

  logIn(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getUid() {
    return this.auth.currentUser.uid
  }

  getEmail() {
    return this.auth.currentUser.email
  }

  signOut() {
    return signOut(this.auth);
  }



  resetPassword(email: string) {
    sendPasswordResetEmail(this.auth, email).then(
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Revise su correo para ver el link de recuperacion se contraseña',
          buttons: [
            {
              text: 'Bueno',
              role: 'cancel',
              handler: () => {
                this.router.navigate(['/log-in']);
              },
            },
          ],
        });
        await alert.present();
      },
    );
  }


 async Cambiarcorreo(email: string) {
        const alert = await this.alertCtrl.create({
          message: 'Este correo valido?, ' + email,
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
              },
            },
            {
              text: 'Si',
              handler: () => {
                updateEmail(this.auth.currentUser, email)
                this.alertaCorreo() 
                setTimeout(()=>this.router.navigate(['/log-in']),5000);
              },
            },
          ],
        });
        await alert.present();
      }
  
  async alertaCorreo() {
    const alert = await this.alertCtrl.create({
      header: 'Su correo ha sido modificado con exito',
      message: 'Su sesión será finalizada en 5 segundos para que vuelva a ingresar con su nuevo correo',
      buttons: ['Cerrar']
    });
    await alert.present();
  }
}

