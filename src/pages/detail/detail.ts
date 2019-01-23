import { APPCONFIG } from './../../app/config';
import { Component, OnInit } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { EditionPage } from '../edition/edition';
import { Clothes } from '../../models/clothes.model';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class DetailPage implements OnInit {
    public clothes: Clothes;
    public urlImg = APPCONFIG.URL_IMG; 
    public EditionPage = EditionPage;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams) {
    }

    ngOnInit(){
        console.log('onInit DetailPage');
        this.clothes = this.navParams.data;
    }

}
