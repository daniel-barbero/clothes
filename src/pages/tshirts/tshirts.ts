import { APPCONFIG } from './../../app/config';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ItemSliding } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { EditionPage } from '../edition/edition';

import { ClothesProvider } from '../../providers/clothes/clothes';

import { Clothes } from '../../models/clothes.model';


@Component({
  selector: 'page-tshirts',
  templateUrl: 'tshirts.html',
})
export class TshirtsPage {
  public urlImg = APPCONFIG.URL_IMG; 
  private listClothes = [];
  reActiveInfinite: any;

  constructor( private loadingController: LoadingController,
              public navCtrl: NavController, 
              private clothesProvider: ClothesProvider,
              private alertCtrl : AlertController) {
  }

  ionViewWillEnter() {
      console.log('ionViewWillEnter TshirtsPage');
      this.onLoadData();
  }

  onLoadData() {
      console.log('onLoadData FUNCTION: ');
      this.listClothes = [];
      
      let loadingSpinner = this.loadingController.create({
        content: "Cargando"
      });
      loadingSpinner.present();
      
      this.clothesProvider.getClothes('camisa')
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

  onAlertDelete(idRecipe) {
      const alert = this.alertCtrl.create({
          title: 'Borrar receta',
          message: '¿Estás seguro de que quieres borrar esta receta?',
          buttons: [
              {
              text: 'Ok',
              handler: () => {
                  this.clothesProvider.deleteClothes(idRecipe).subscribe(
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
