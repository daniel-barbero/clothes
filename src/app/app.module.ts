import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// PAGES
import { HomePage } from '../pages/home/home';
import { TshirtsPage } from '../pages/tshirts/tshirts';
import { EditionPage } from '../pages/edition/edition';
import { DetailPage } from '../pages/detail/detail';

// PROVIDERS
import { ClothesProvider } from '../providers/clothes/clothes';

// PIPES
import { PipesModule } from './../pipes/pipes.module';

// PLUGINS


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TshirtsPage,
    DetailPage,
    EditionPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    PipesModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TshirtsPage,
    DetailPage,
    EditionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClothesProvider
  ]
})
export class AppModule {}
