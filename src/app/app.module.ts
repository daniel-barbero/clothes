import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// PAGES
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EditionPage } from '../pages/edition/edition';
import { DetailPage } from '../pages/detail/detail';
import { FilterPage } from './../pages/filter/filter';

// PROVIDERS
import { ClothesProvider } from '../providers/clothes/clothes';

// PIPES
import { PipesModule } from '../pipes/pipes.module';

// PLUGINS
import { Camera } from '@ionic-native/camera';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImageResizer } from '@ionic-native/image-resizer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    EditionPage,
    FilterPage
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
    ListPage,
    DetailPage,
    EditionPage,
    FilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClothesProvider,
    Camera,
    File,
    FileTransfer,
    ImageResizer
  ]
})
export class AppModule {}
