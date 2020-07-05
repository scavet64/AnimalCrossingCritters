import { Injectable, OnInit } from '@angular/core';
import { Fish } from './fish';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Critter } from '../models/critter';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  constructor(private httpClient: HttpClient) { }

  public loadFish(): Observable<Fish[]> {
    return this.httpClient.get<any>('assets/data/FishCustom.json');
  }

  public getImagePath(fish: Critter): string {
    return `./assets/imgs/fish/${fish.CritterNumber}.png`;
  }

}
