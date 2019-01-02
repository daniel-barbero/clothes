import { APPCONFIG } from '../../app/config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ClothesProvider {

  constructor(public http: Http) {
      console.log('Hello ClothesProvider Provider');
  }

  getClothes(page:number): Observable<any>{
      return this.http.get(APPCONFIG.API+'allClothes/'+page).map(response => response.json())
      .catch((error:any) => Observable.throw(error || 'server error'));
  }
}
