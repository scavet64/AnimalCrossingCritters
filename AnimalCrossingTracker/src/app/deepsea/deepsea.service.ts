import { Injectable } from '@angular/core';
import { DeepSea } from './deepsea';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Critter } from '../models/critter';

@Injectable({
  providedIn: 'root'
})
export class DeepSeaService {

  public deepSea: DeepSea[];

  constructor(private httpClient: HttpClient) { }

  public loadDeepSea(): Observable<DeepSea[]> {
    if (!this.deepSea) {
      return this.httpClient.get<any>('assets/data/DeepSeaCustom.json');
    } else {
      return Observable.create(observe => {
        return this.deepSea;
      });
    }
  }

  public getImagePath(fish: Critter): string {
    return `./assets/imgs/deepsea/${fish.CritterNumber}.png`;
  }
}
