import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  async volver(){
    this.router.navigate(['/home']);
    await this.modalCtrl.dismiss();
  }

  async irDatos(){
    this.router.navigate(['/profile']);
    await this.modalCtrl.dismiss();
  }

  async irHistorial(){
    this.router.navigate(['/historial']);
    await this.modalCtrl.dismiss();
  }

  logout(){
    this.authenticationService.signOut();
    this.modalCtrl.dismiss();
    this.router.navigate(['/log-in']);
  }

}
