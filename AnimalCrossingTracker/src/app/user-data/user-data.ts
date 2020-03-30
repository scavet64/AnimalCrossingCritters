export class UserData {
  ownedFish: number[];
  ownedBugs: number[];

  filteredHemisphere = 'Northern';
  filteredMonth = '';
  filteredTime: string[] = [];
  filteredName = '';
  hideCaptured = false;
  availability = 'Available';

  version = '0.1.1';
}
