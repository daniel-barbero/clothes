import { APPCONFIG } from './../../app/config';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TshirtsPage } from './../tshirts/tshirts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
    public urlImg = APPCONFIG.URL_IMG; 
    
    constructor(public navCtrl: NavController) {

    }

    // Buttons goToPage
    goToPage(namePage) {
      switch (namePage){

          case 'tshirts':
          this.navCtrl.push(TshirtsPage);
          break;
          /*
          case 'pants':
          this.navCtrl.push(Pants);
          break;

          case 'jackets':
          this.navCtrl.push(Jackets);
          break;
          
          case 'accesories':
          this.navCtrl.push(Accesories);
          break;

          case 'shoes':
          this.navCtrl.push(Shoes);
          break;

          case 'new':
          this.navCtrl.push(NewElement);
          break;
          */
      }
    }
}
