import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ListPage } from './../list/list';
import { EditionPage } from '../edition/edition';
import { FilterPage } from '../filter/filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
    public urlImg = './assets/imgs/'; 
    
    constructor(public navCtrl: NavController) {

    }

    // Buttons goToPage
    goToPage(namePage, category) {
      switch (namePage){

          case 'list':
          this.navCtrl.push(ListPage, {category: category});
          break;
          
          case 'edition':
          this.navCtrl.push(EditionPage, {id: '0'});
          break;

          case 'filter':
          this.navCtrl.push(FilterPage);
          break;
          
      }
    }
}
