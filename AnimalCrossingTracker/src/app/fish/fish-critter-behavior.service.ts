import { Injectable } from '@angular/core';
import { CritterBehavior } from '../critter-display/critter-behavior';
import { Critter } from '../models/critter';
import { UserDataService } from '../user-data/user-data.service';
import { FishService } from './fish.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FishCritterBehaviorService implements CritterBehavior {

  constructor(
    public userDataService: UserDataService,
    public fishService: FishService
  ) { }

  loadCritters(): Observable<Critter[]> {
    return this.fishService.loadFish();
  }

  hasCritter(critter: Critter): boolean {
    return this.userDataService.userData.ownedFish.find(id => id === critter.CritterNumber) !== undefined;
  }

  getOwnedCritters(): number[] {
    return this.userDataService.userData.ownedFish;
  }

  updateOwnedCritters(owned: number[]) {
    this.userDataService.userData.ownedFish = owned;
  }

  getImage(critter: Critter): string {
    return this.fishService.getImagePath(critter);
  }

  getCaptureDetail(): string {
    return 'Location:';
  }
}
