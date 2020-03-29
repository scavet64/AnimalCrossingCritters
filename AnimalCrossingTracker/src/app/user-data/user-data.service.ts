import { Injectable } from '@angular/core';
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private readonly VERSION = '0.1';
  private readonly DATA_KEY = 'animalcrossingdata';

  public userData: UserData;

  constructor() {
    this.loadUserData();
  }

  private loadUserData() {
    const data = localStorage.getItem(this.DATA_KEY);
    if (data) {
      this.userData = JSON.parse(data);
    } else {
      // Init and save starting data
      this.userData = {
        ownedBugs: [],
        ownedFish: []
      };
      localStorage.setItem(this.DATA_KEY, JSON.stringify(this.userData));
    }
  }

  save() {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(this.userData));
  }
}
