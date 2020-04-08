import { Injectable } from '@angular/core';
import { UserData } from './user-data';
import { Constants } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private readonly DATA_KEY = 'animalcrossingdata';

  public userData: UserData;

  constructor() {
    this.loadUserData();
  }

  private loadUserData() {
    const data = localStorage.getItem(this.DATA_KEY);
    if (data) {
      const loadedData = JSON.parse(data);
      // Upgrade Data
      if (!loadedData.version) {
        const newData = new UserData();
        newData.ownedBugs = loadedData.ownedBugs;
        newData.ownedFish = loadedData.ownedFish;
        this.userData = newData;
        this.save();
      } else if (loadedData.version === '0.1.1') {
        loadedData.critterOrder = 'id-a';
        loadedData.version = Constants.VERSION;
        this.userData = loadedData;
        this.save();
      } else {
        this.userData = loadedData;
      }
    } else {
      // Init and save starting data
      this.userData = {
        ownedBugs: [],
        ownedFish: [],
        filteredHemisphere: 'Northern',
        filteredMonth: '',
        filteredName: '',
        filteredTime: [],
        hideCaptured: false,
        availability: 'Available',
        critterOrder: 'id-a',
        version: Constants.VERSION
      };
      localStorage.setItem(this.DATA_KEY, JSON.stringify(this.userData));
    }
  }

  save() {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(this.userData));
  }
}
