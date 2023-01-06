import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  visualizar(id){
    let navigationExtras: NavigationExtras = {
      state: {id}
    }
    this.router.navigate(['/categories'], navigationExtras);
  }

}
