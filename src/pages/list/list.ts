import { APPCONFIG } from './../../app/config';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ItemSliding } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { EditionPage } from '../edition/edition';

import { ClothesProvider } from '../../providers/clothes/clothes';
import { Clothes } from '../../models/clothes.model';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  public urlImg = APPCONFIG.URL_IMG; 
  private listClothes = [];
  public category: string;

  constructor( private loadingController: LoadingController,
              public navCtrl: NavController, 
              private navParams: NavParams,
              private clothesProvider: ClothesProvider,
              private alertCtrl : AlertController) {

  }

  ionViewWillEnter() {
      console.log('ionViewWillEnter ListPage');
      this.category = this.navParams.data.category;
      this.onLoadData();
  }

  onLoadData() {
      console.log('onLoadData FUNCTION: ');
      this.listClothes = [];
      
      let loadingSpinner = this.loadingController.create({
        content: "Cargando"
      });
      loadingSpinner.present();
      
      this.clothesProvider.getClothes(this.category)
      .subscribe(
          result => {
              if (typeof result === 'string'){
                  loadingSpinner.dismiss();
                  console.log(result);
                  this.onAlertError(result.substring(result.lastIndexOf(':')+2, result.lastIndexOf('"')));
              }
              else {
                  result.forEach(
                    element => {
                      this.listClothes.push(new Clothes (element.id,
                                                element.description,
                                                element.brand,
                                                element.store,
                                                element.size,
                                                element.category,
                                                element.colour,
                                                element.state, 
                                                element.img));
                    }
                  );
                  loadingSpinner.dismiss();
                  console.log(this.listClothes);
              }
          },
          error => {
              loadingSpinner.dismiss();
              this.onAlertError(error);
          }
      );
  }

  onEditionClothes(clothes: Clothes, slidingItem: ItemSliding) {
      slidingItem.close();
      this.navCtrl.push(EditionPage, clothes);
  }

  detailClothes(clothes: Clothes) {
      this.navCtrl.push(DetailPage, clothes);
  }

  onAlertDelete(idClothes) {
      const alert = this.alertCtrl.create({
          title: 'Borrar prenda',
          message: '¿Estás seguro de que quieres borrar esta prenda?',
          cssClass: 'alertKO',
          buttons: [
              {
              text: 'Ok',
              handler: () => {
                  this.clothesProvider.deleteClothes(idClothes).subscribe(
                    result => {
                      if (result.includes('error')){
                          this.onAlertError(result.substring(result.lastIndexOf(':')+2, result.lastIndexOf('"')));
                      }
                      else {
                          this.onAlertSuccess(result.substring(result.lastIndexOf(':')+2, result.lastIndexOf('"')));
                      }    
                    });
              }
              },
              {
                text: 'Cancelar',
                role: 'cancel'
              }
          ]
      });

      alert.present();
  }

  onAlertError(error) {
      const alert = this.alertCtrl.create({
          title: 'Error de acceso',
          message: error,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                  this.onLoadData();
              }
            }
          ]
      });

      alert.present();
  }

  onAlertSuccess(msg) {
      const alert = this.alertCtrl.create({
          title: 'Acción realizada con éxito',
          message: msg,
          cssClass: 'alertOK',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                  this.onLoadData();
              }
            }
          ]
      });
      
      alert.present();
  }

}
