import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { ModalController } from '@ionic/angular';
import { FichaPPage } from '../../pages/ficha-p/ficha-p.page';
import SwiperCore, {Pagination,Autoplay, Keyboard, Scrollbar, Zoom } from "swiper";
import { Router, NavigationExtras } from '@angular/router';

SwiperCore.use([Pagination, Autoplay]);
declare var document;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  listaTiendas: any;
  listaProductos: any;
  tienda: any;

  constructor(private dataService: DataService, private statusBar: StatusBar, private modalCtrl: ModalController, private router: Router) {
    this.dataService.getTiendas().subscribe(res => {
      this.listaTiendas = res;
    })
    NavigationBar.setColor({color : '#CE9D42', darkButtons: false})
    this.statusBar.backgroundColorByHexString('#CE9D42');
    this.statusBar.styleDefault();
   }

  ngOnInit() {}


  listarProductos(event){
    this.dataService.getProductosTienda(event.target.value.id).subscribe(res => {
      this.tienda=event.target.value.id;
      this.listaProductos = res
    })
  }

  async abrirModalp(id){
    const modal= await this.modalCtrl.create({
      component: FichaPPage,
      breakpoints:[0,0.8,1],
      initialBreakpoint:0.8,
      componentProps:{
        producto: id,
        tienda: this.tienda
      }
    });
    await modal.present();
  }

  gotoNext()
  {
   const swiper = document.querySelector('.swiper',{
    autoplay:{
      delay: 3000,
    },
   });
   swiper;
   swiper.slideNext();
  }

  gotoPrev()
  {
    const swiper = document.querySelector('.swiper').
    swiper;
    swiper.slidePrev();
  }

}
