import { Injectable } from '@angular/core';
import { CritterBehavior } from '../critter-display/critter-behavior';
import { Critter } from '../models/critter';
import { UserDataService } from '../user-data/user-data.service';
import { DeepSeaService } from './deepsea.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeepSeaCritterBehaviorService implements CritterBehavior {

  constructor(
    public userDataService: UserDataService,
    public deepSeaService: DeepSeaService
  ) { }

  loadCritters(): Observable<Critter[]> {
    return this.deepSeaService.loadDeepSea();
  }

  hasCritter(critter: Critter): boolean {
    return this.userDataService.userData.ownedDeepsea.find(id => id === critter.CritterNumber) !== undefined;
  }

  getOwnedCritters(): number[] {
    return this.userDataService.userData.ownedDeepsea;
  }

  updateOwnedCritters(owned: number[]) {
    this.userDataService.userData.ownedDeepsea = owned;
  }

  getImage(critter: Critter): string {
    return this.deepSeaService.getImagePath(critter);
  }

  getCaptureDetail(): string {
    return 'Swimming Pattern:';
  }
}
