import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ClothesProvider } from '../../providers/clothes/clothes';

import { Clothes } from '../../models/clothes.model';

@Component({
  selector: 'page-tshirts',
  templateUrl: 'tshirts.html',
})
export class TshirtsPage {

  private page: number = -1;
  private listClothes = [];
  public urlImg = "http://clothes.danielbarbero.es/img/";
  reActiveInfinite: any;

  constructor( private loadingController: LoadingController,
              public navCtrl: NavController, 
              private clothesProvider: ClothesProvider,
              private alertCtrl : AlertController) {
  }

  ionViewWillEnter() {
      console.log('ionViewWillEnter TshirtsPage');
      this.onLoadData('all');
  }

  onLoadData(limit?) {
      console.log('onLoadData FUNCTION: ');
      this.listClothes = [];
      this.page = ( limit == 'all')? 9999 : 0;
      console.log(limit);
      
      let loadingSpinner = this.loadingController.create({
        content: "Cargando"
      });
      loadingSpinner.present();
      
      this.clothesProvider.getClothes(this.page)
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
                                                element.img,
                                                element.imgdetail));
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
