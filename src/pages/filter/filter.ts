import { APPCONFIG } from './../../app/config';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ItemSliding } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ClothesProvider } from '../../providers/clothes/clothes';
import { Clothes } from '../../models/clothes.model';
import { EditionPage } from '../edition/edition';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  public urlImg = APPCONFIG.URL_IMG;
  private listClothes = [];
  public lastSearch: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private clothesProvider: ClothesProvider,
      private loadingController: LoadingController,
      public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  applyFilter(form: NgForm) {
      console.log('applyFilter FUNCTION: ');
      this.listClothes = [];
      this.lastSearch = form;

      let loadingSpinner = this.loadingController.create({
        content: "Cargando"
      });
      loadingSpinner.present();
      
      this.clothesProvider.getClothesFilter( form.value.filter,  form.value.filterText)
      .subscribe(
          result => {
              if (typeof result === 'string'){
                  loadingSpinner.dismiss();
                  console.log(result);
                  this.onAlertError(result.substring(result.lastIndexOf(':')+2, result.lastIndexOf('"')));
              }
              else {
                  console.log(result);
                  result.forEach(
                    element => {
                      this.listClothes.push(new Clothes (element.id,
                                                element.description,
                                                element.brand,
                                                element.store,
                                                element.size,
                                                element.category,
                                                element.colour,
                                                element.colourBadge,
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
          title: 'No se han encontrado resultados con este criterio',
          message: error,
          cssClass: 'alertKO',
          buttons: [
            {
              text: 'Ok'
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
                    this.applyFilter(this.lastSearch);
                }
              }
            ]
        });
        
        alert.present();
    }

}
