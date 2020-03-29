import { Component, OnInit, Input } from '@angular/core';
import { MonthColorService } from '../color-service/month-color.service';
import { UserDataService } from '../user-data/user-data.service';
import { Critter } from '../models/critter';
import { Bug } from '../bugs/bug';
import { FishService } from '../fish/fish.service';
import { BugService } from '../bugs/bug.service';

@Component({
  selector: 'app-critter-display',
  templateUrl: './critter-display.component.html',
  styleUrls: ['./critter-display.component.scss']
})
export class CritterDisplayComponent implements OnInit {

  @Input() critters: Bug[];
  @Input() bugs: Bug[] = [];
  @Input() type: string;

  filteredBugs: Critter[];

  searchBar = '';
  selectedMonths: string[] = [];
  selectedTimes: string[] = [];
  selectedHemisphere = 'Northern';
  hideCaptured = false;


  constructor(
    public fishService: FishService,
    public bugService: BugService,
    public monthColorService: MonthColorService,
    public userDataService: UserDataService
  ) { }

  ngOnInit() {
    // TODO: This should not be needed but for whatever reason the input array is not working
    if (this.type === 'bug') {
      this.bugService.loadBugs().subscribe(res => {
        this.critters = res;
        this.filteredBugs = this.critters;
      });
    } else {
      this.fishService.loadFish().subscribe(res => {
        this.critters = res;
        this.filteredBugs = this.critters;
      });
    }
  }

  getMonthColor(month: string) {
    return this.monthColorService.getRandomColor(month);
  }

  updateFilter() {
    this.filteredBugs = this.critters.filter(fish => {
      if (this.searchBar !== '' && !fish.Name.toLowerCase().includes(this.searchBar.toLowerCase())) {
        return false;
      }

      // Filter by month
      const containsMonth = this.containsMonth(fish);
      const containsTime = this.containsTime(fish);
      const captureCheck = this.captureCheck(fish);

      return containsMonth && containsTime && captureCheck;
    });
  }

  private captureCheck(critter: Critter) {
    if (this.hideCaptured) {
      return this.userDataService.userData.ownedBugs.indexOf(critter.CritterNumber) < 0;
    } else {
      return true;
    }
  }

  private containsMonth(critter: Critter) {
    if (this.selectedMonths.length === 0) {
      return true;
    }

    let contains = false;
    if (this.selectedHemisphere === 'Northern') {
      this.selectedMonths.forEach(month => {
        if (critter.NorthHemisphere.includes(month)) {
          contains = true;
        }
      });
    } else {
      this.selectedMonths.forEach(month => {
        if (critter.SouthHemisphere.includes(month)) {
          contains = true;
        }
      });
    }
    return contains;
  }

  private containsTime(critter: Critter) {
    if (this.selectedTimes.length === 0) {
      return true;
    }

    let contains = false;
    this.selectedTimes.forEach(time => {
      if (critter.TimeList.includes(time)) {
        contains = true;
      }
    });
    return contains;
  }

  resetFilter() {
    this.filteredBugs = this.critters;
    this.selectedMonths = [];
    this.selectedTimes = [];
    this.searchBar = '';
    this.hideCaptured = false;
  }

  hasFish(critter: Critter) {
    return this.userDataService.userData.ownedBugs.find(fishId => fishId === critter.CritterNumber) !== undefined;
  }

  ownershipChange(critter: Critter) {
    // If we have it, remove it
    const userData = this.userDataService.userData;
    if (userData.ownedBugs.find(fishId => fishId === critter.CritterNumber)) {
      userData.ownedBugs = userData.ownedBugs.filter(fishId => fishId !== critter.CritterNumber);
    } else {
      userData.ownedBugs.push(critter.CritterNumber);
    }
    this.userDataService.save();
  }

  monthsToDisplay(critter: Critter) {
    if (this.selectedHemisphere === 'Northern') {
      return critter.NorthHemisphere;
    } else {
      return critter.SouthHemisphere;
    }
  }

  getImage(critter: Critter) {
    if (this.type === 'bug') {
      return this.bugService.getImagePath(critter);
    } else {
      return this.fishService.getImagePath(critter);
    }
  }

}
