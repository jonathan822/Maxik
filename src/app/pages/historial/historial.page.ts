import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  historial : any;
  registro: any;
  actualIndex: any;
  isModalOpen = false;
  estadoBoton = false;

  constructor(private dataService: DataService) { 
    this.dataService.traerHistorial().subscribe(res => {
      this.historial = res
    })
  }

  ngOnInit() { 
  }

  setOpen(isOpen: boolean, id, index) {
    this.isModalOpen = isOpen;
    this.actualIndex = index
    if (this.estadoBoton){
      this.estadoBoton = false
    }
    this.dataService.traerRegistro(id).subscribe(res => {
      this.registro = res
    });
  }

  


}
