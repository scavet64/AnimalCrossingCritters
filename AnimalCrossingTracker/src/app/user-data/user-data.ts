import { Constants } from '../models/constants';

export class UserData {
  ownedFish: number[];
  ownedBugs: number[];

  filteredHemisphere = 'Northern';
  filteredMonth = '';
  filteredTime: string[] = [];
  filteredName = '';
  hideCaptured = false;
  availability = 'Available';
  critterOrder = 'id-a';

  version = Constants.VERSION;
}
