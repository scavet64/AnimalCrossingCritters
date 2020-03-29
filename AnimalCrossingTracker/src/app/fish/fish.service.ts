import { Injectable, OnInit } from '@angular/core';
import { Fish } from './fish';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  public fish: Fish[];

  constructor(private httpClient: HttpClient) {

  }

  public loadFish(): Observable<Fish[]> {
    if (!this.fish) {
      return this.httpClient.get<any>("assets/data/FishCustom.json");
    } else {
      return Observable.create(observe => {
        return this.fish;
      });
    }
  }

  public getImagePath(fish: Fish): string {
    return `./assets/imgs/fish/${fish.CritterNumber}.png`;
  }

  // public getFish(): Fish[] {
  //   return this.fish;
  // }
}
