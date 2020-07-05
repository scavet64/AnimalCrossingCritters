import { Injectable } from '@angular/core';
import { CritterBehavior } from '../critter-display/critter-behavior';
import { UserDataService } from '../user-data/user-data.service';
import { BugService } from './bug.service';
import { Critter } from '../models/critter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BugCritterBehaviorService implements CritterBehavior {

  constructor(
    public userDataService: UserDataService,
    public bugService: BugService
  ) { }

  loadCritters(): Observable<Critter[]> {
    return this.bugService.loadBugs();
  }

  hasCritter(critter: Critter): boolean {
    return this.userDataService.userData.ownedBugs.find(id => id === critter.CritterNumber) !== undefined;
  }

  getOwnedCritters(): number[] {
    return this.userDataService.userData.ownedBugs;
  }

  updateOwnedCritters(owned: number[]) {
    this.userDataService.userData.ownedBugs = owned;
  }

  getImage(critter: Critter): string {
    return this.bugService.getImagePath(critter);
  }

  getCaptureDetail(): string {
    return 'Location:';
  }
}
