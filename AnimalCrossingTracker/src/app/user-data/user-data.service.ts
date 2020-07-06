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

    // Check if there is any saved data
    if (data) {
      // Parse the saved data and process it.
      let loadedData = JSON.parse(data);

      if (loadedData.version !== Constants.VERSION) {
        loadedData = this.upgrade(loadedData);
      }

      this.userData = loadedData;
    } else {
      // No saved data, initialize new user data and store it
      this.initializeNewUserData();
    }
  }

  /**
   * Update the players loaded data incrementally based on the last saved version.
   * Fall through is desired here so that each upgrade step will be preformed in
   * sequence based on what needs to be done at each stage. This is important as
   * not all version upgrades may need an update to the user data object
   * @param loadedData The loaded data to upgrade
   */
  private upgrade(loadedData: UserData): UserData {
    switch (loadedData.version) {
      case undefined:
        const newData = new UserData();
        newData.ownedBugs = loadedData.ownedBugs;
        newData.ownedFish = loadedData.ownedFish;
        loadedData = newData;
      // tslint:disable-next-line: no-switch-case-fall-through
      case '0.1.1':
        loadedData.critterOrder = 'id-a';
      // tslint:disable-next-line: no-switch-case-fall-through
      case '0.2.0':
        loadedData.ownedDeepsea = [];
    }

    loadedData.version = Constants.VERSION;
    this.save();

    return loadedData;
  }

  private initializeNewUserData() {
    this.userData = {
      ownedBugs: [],
      ownedFish: [],
      ownedDeepsea: [],
      filteredHemisphere: 'Northern',
      filteredMonth: '',
      filteredName: '',
      filteredTime: [],
      hideCaptured: false,
      availability: 'Available',
      critterOrder: 'id-a',
      version: Constants.VERSION
    };
    this.save();
  }

  save() {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(this.userData));
  }
}
