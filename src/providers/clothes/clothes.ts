import { APPCONFIG } from '../../app/config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Clothes } from '../../models/clothes.model';


@Injectable()
export class ClothesProvider {

  constructor(public http: Http) {
      console.log('Hello ClothesProvider Provider');
  }

  getClothes(category:string): Observable<any>{
      return this.http.get(APPCONFIG.API+'allClothes/'+category).map(response => response.json())
      .catch((error:any) => Observable.throw(error || 'server error'));
  }

  updateClothes(id:number, clothes:Clothes){
      return this.http.put(APPCONFIG.API+'update/'+id, clothes).map(response => response.json())
      .catch((error:any) => Observable.throw(error || 'server error'));
  }

  createClothes(clothes:Clothes){
      return this.http.post(APPCONFIG.API+'create', clothes).map(response => response.json())
      .catch((error:any) => Observable.throw(error || 'server error'));
  }

  deleteClothes(id: number) {
      return this.http.delete(APPCONFIG.API+'delete/'+id).map(response => response.json())
      .catch((error:any) => Observable.throw(error || 'server error'));
  }
}
