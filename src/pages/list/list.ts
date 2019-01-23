import { APPCONFIG } from './../../app/config';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ItemSliding, VirtualScroll } from 'ionic-angular';

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
  public ascDesc:boolean = true; // true ASC - false DESC
  private fieldOrder:string = 'store';
  public isToggled: boolean;

  constructor( private loadingController: LoadingController,
              public navCtrl: NavController, 
              private navParams: NavParams,
              private clothesProvider: ClothesProvider,
              private alertCtrl : AlertController,
              private cdRef: ChangeDetectorRef) {
      this.isToggled = true;
  }

  @ViewChild(VirtualScroll) virtualScroll: VirtualScroll;

  virtualScrollHack() {
      this.cdRef.detectChanges();
      this.virtualScroll['_ctrl'].readReady.emit();
      this.virtualScroll['_ctrl'].writeReady.emit();
  }

  ionViewWillEnter() {
      console.log('ionViewWillEnter ListPage');

      this.category = this.navParams.data.category;
      this.onLoadData();
  }

  public changeGrid() {
      console.log("Toggled: "+ this.isToggled); 
      this.virtualScrollHack();
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

  sortBy(field, reverse, primer){
      var key = function (x) {return primer ? primer(x[field]) : x[field]};
  
      return function (a,b) {
          var A = key(a), B = key(b);
          return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
      }
  }

  sortList(field, direction){
      this.fieldOrder = field;
      this.listClothes = this.listClothes.sort(this.sortBy(field, direction, function(a){return a.toUpperCase()}));
  }

  changeAscDesc(){
      this.ascDesc = (this.ascDesc)? false: true;
      this.listClothes = this.listClothes.sort(this.sortBy(this.fieldOrder, this.ascDesc, function(a){return a.toUpperCase()}));
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
