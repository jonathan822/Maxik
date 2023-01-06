import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  id: any;

  uid: any = [
    {
      nombre: '',
      apellido: '',
      Genero: '',
      Fecha_nac: '',
      email: ''
    }
  ]
  email = ''

  constructor(private dataService: DataService,
    private AuthenticationService: AuthenticationService,
    public Alerta: AlertController,) 
    {
    this.dataService.getUsuario(this.AuthenticationService.getUid()).subscribe(res => {
      this.uid = res;
      this.id = this.AuthenticationService.getUid();
      this.uid.email = this.AuthenticationService.getEmail();
    })
  }

  ngOnInit() {
    //this.uid = this.dataservice.getUsuario();
    //this.dataservice.()=subscribe( res =>{

    //})
  }

  alerta(titulo) {
    this.presentAlert(titulo, "Desea modificar? ");
  }
  async presentAlert(titulo: string, message: string) {
    const alert = await this.Alerta.create({
      header: titulo,
      message: message,
      inputs: [{
        name: 'dato',
        placeholder: 'Ingrese Modificacion'
      },
      ],
      buttons: [{
        text: 'Cancelar',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Guardar',
        handler: (data) => {
          if (data.dato.length > 0) {

            this.dataService.Updateuser(titulo.toLocaleLowerCase(), data.dato, this.id)
          }
          console.log('Confirm Ok');
        }
      }
      ]
    });

    await alert.present();
  }

  async presentAlertacorreo() {
    const alert = await this.Alerta.create({
      header: "Correo electronico",
      message: "Desea modificar? ",
      inputs: [{
        name: 'dato',
        placeholder: 'Ingrese nuevo Correo'
      },
      ],
      buttons: [{
        text: 'Cancelar',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Guardar',
        handler: (data) => {
          if (data.dato.length > 0) {

            this.AuthenticationService.Cambiarcorreo(data.dato)
          }
          console.log('Confirm Ok');
        }
      }
      ]
    });

    await alert.present();
  }
}