import { APPCONFIG } from './../../app/config';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ClothesProvider } from '../../providers/clothes/clothes';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ImageResizer } from '@ionic-native/image-resizer';
import { File } from '@ionic-native/file';
import { Clothes } from '../../models/clothes.model';

@Component({
  selector: 'page-edition',
  templateUrl: 'edition.html',
})

export class EditionPage implements OnInit {

  public clothes: Clothes;
  public urlImg = APPCONFIG.URL_IMG;
  public dataurl: string;
  public literalTitle: string = "Editar";

  private win: any = window;
  private objectImgSelected: string = null;
  public newName: string = null;
  private editionImage: boolean = false;

  constructor(public loadingCtrl: LoadingController,
              public navCtrl: NavController, 
              private navParams: NavParams,
              private clothesProvider: ClothesProvider,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              private camera: Camera,
              private file: File,
              private transfer: FileTransfer,
              private imageResizer: ImageResizer) {
  }

  ngOnInit() {
      console.log('OnInit EditionPage');
      console.log(this.navParams.data);
      this.clothes = this.navParams.data;
      this.dataurl = this.urlImg + 'noImg.png';

      // NEW clothes
      if (this.clothes.id === '0'){
          this.literalTitle = "Nueva";
      }

      if (this.clothes.img != ''){
          this.dataurl = this.urlImg + this.clothes.img;
      }
  }

  openSelectorImage() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Elegir imagen',
        buttons: [
          {
            text: 'Hacer foto',
            role: 'destructive',
            icon: 'ios-camera-outline',
            handler: () => {
              this.selectImage(1);
            }
          },
          {
            text: 'Elegir foto de la Galería',
            icon:  'ios-images-outline',
            handler: () => {
              this.selectImage(0);
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel'
          },
        ]
      });
      actionSheet.present();
  }

  selectImage(sourceType:number){

      const optionsGetImage: CameraOptions = {
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          allowEdit: true,
          sourceType:sourceType
      }
      
      this.camera.getPicture(optionsGetImage).then((imageData) => {

          this.newName = this.createFileName();
          this.clothes.img = this.newName;
          this.editionImage = true;

          this.imageResizer.resize({
              uri: imageData,
              folderName: this.file.dataDirectory,
              quality: 85,
              width: 1280,
              height: 1280
          }).then(result => {
              this.objectImgSelected = result;
              console.log(this.objectImgSelected);
              this.dataurl = this.win.Ionic.WebView.convertFileSrc(this.objectImgSelected);
              console.log('normalizeURL: ' + this.dataurl);
          })
          .catch(err => console.log(err));

      })
      .catch(err => this.onAlertError('Imagen no seleccionada', err));
  }

  createFileName() {
      let newFileName = this.stringDate() + '_' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8) + '.jpg';
      console.log('createFileName: ' + newFileName);
      return newFileName;
  }

  uploadFile() {
      let loader = this.loadingCtrl.create({
        content: "Uploading..."
      });
      loader.present();

      let options: FileUploadOptions = {
          fileName: this.newName,
      };
    
      const fileTransfer: FileTransferObject = this.transfer.create();
      // Use the FileTransfer to upload the image
      fileTransfer.upload(this.objectImgSelected, 'http://clothes.danielbarbero.es/public/index.php/api/v1/uploadImage/', options)
      .then(data => {
          console.log('uploadFile ----- ' + data );
          loader.dismiss();
          this.onAlertSuccess('Datos e imagen guardados con éxito');
      }, err => {
          loader.dismiss();
          this.onAlertError('Imagen no seleccionada', err);
      });
  }

  saveClothes(form: NgForm){
      console.log('saveRecipe function: ' + form.value.colour);
      this.clothes = form.value;

      if (form.value.id == 0){
        this.clothesProvider.createClothes(form.value).subscribe(
            result => {
                if (result.includes('error')){
                    this.onAlertError('Error de acceso a la base de datos', result.substring(result.lastIndexOf(':')+2, result.lastIndexOf('"')));
                }
                else {
                    APPCONFIG.reloadList = true;
                    if (this.editionImage){
                      this.uploadFile();
                    }
                    else {
                      this.onAlertSuccess(result.substring(result.lastIndexOf(':')+2, result.lastIndexOf('"')));
                    }
                }    
            },
            error => {
              this.onAlertError('Error de acceso a la base de datos', error);
            }
        );
      }
      else {
        this.clothesProvider.updateClothes(form.value.id, form.value).subscribe(
          result => {
              if (result.includes('error')){
                  this.onAlertError('Error de acceso a la base de datos',result.substring(result.lastIndexOf(':')+2, result.lastIndexOf('"')));
              }
              else {
                  APPCONFIG.reloadList = true;
                  if (this.editionImage){
                      this.uploadFile();
                  }
                  else {
                      this.onAlertSuccess(result.substring(result.lastIndexOf(':')+2, result.lastIndexOf('"')));
                  }
              }    
          },
          error => {
              console.log(error);
          }
        );
      }
  }

  onAlertError(title: string, error) {
      const alert = this.alertCtrl.create({
          title: title,
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
                  this.navCtrl.popToRoot();
              }
            }
          ]
      });
      
      alert.present();
  }

  stringDate(){
      let newDate = new Date();
      let options = { year: 'numeric', month: 'numeric', day: 'numeric' };

      let newDateFormat= newDate.toLocaleDateString('es-ES', options);
      return newDateFormat.replace(/\//g, '_');
  }

}
