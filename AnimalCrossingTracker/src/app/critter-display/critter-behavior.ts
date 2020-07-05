import { Critter } from '../models/critter';
import { Observable } from 'rxjs';

export interface CritterBehavior {

  loadCritters(): Observable<Critter[]>;

  hasCritter(critter: Critter): boolean;

  getOwnedCritters(): number[];

  updateOwnedCritters(owned: number[]);

  getImage(critter: Critter): string;

  getCaptureDetail(): string;
}
