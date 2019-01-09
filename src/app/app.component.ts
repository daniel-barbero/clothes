import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EditionPage } from '../pages/edition/edition';
import { FilterPage } from './../pages/filter/filter';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: Nav;;

  rootPage :any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              private splashScreen: SplashScreen) {

        this.splashScreen.show();
        this.initializeApp();

        this.pages = [
          { title: 'Home', component: HomePage, icon: 'home'},
          { title: 'Filtro', component: FilterPage, icon: 'search'},
          { title: 'Nueva Prenda', component: EditionPage, icon: 'add-circle'}
      ];
  }


  initializeApp() {
      this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
      });
  }

  openPage(page) {
      // close the menu when clicking a link from the menu
      this.menu.close();

      // navigate to the new page if it is not the current page
      if(page.component == HomePage){
          this.nav.setRoot(HomePage);
      } else {
          this.nav.push(page.component, {id: '0'});
      }
  }

}

