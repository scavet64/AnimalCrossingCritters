import { Component, OnInit, Input } from '@angular/core';
import { MonthColorService } from '../color-service/month-color.service';
import { UserDataService } from '../user-data/user-data.service';
import { Critter } from '../models/critter';
import { Bug } from '../bugs/bug';
import { FishService } from '../fish/fish.service';
import { BugService } from '../bugs/bug.service';
import { Constants } from '../models/constants';
import { Fish } from '../fish/fish';

@Component({
  selector: 'app-critter-display',
  templateUrl: './critter-display.component.html',
  styleUrls: ['./critter-display.component.scss']
})
export class CritterDisplayComponent implements OnInit {

  @Input() critters: Critter[];
  @Input() type: string;

  filteredCritters: Critter[] | Fish[];

  searchBar = '';
  selectedMonth: string;
  selectedTimes: string[] = [];
  selectedHemisphere = 'Northern';
  hideCaptured = false;
  selectedAvailability = 'Available';

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
        this.filteredCritters = this.critters;
        this.updateFilter();
      });
    } else {
      this.fishService.loadFish().subscribe(res => {
        this.critters = res;
        this.filteredCritters = this.critters;
        this.updateFilter();
      });
    }

    const userData = this.userDataService.userData;
    // Initialize filters based on saved user data
    this.selectedMonth = userData.filteredMonth;
    this.selectedTimes = userData.filteredTime;
    this.selectedHemisphere = userData.filteredHemisphere;
    this.hideCaptured = userData.hideCaptured;
    this.searchBar = userData.filteredName;
    this.selectedAvailability = userData.availability;
  }

  getMonthColor(month: string) {
    return this.monthColorService.getRandomColor(month);
  }

  updateFilter() {
    this.filteredCritters = this.critters.filter(fish => {
      if (this.searchBar !== '' && !fish.Name.toLowerCase().includes(this.searchBar.toLowerCase())) {
        return false;
      }

      // Filter by month
      const containsMonth = this.containsMonth(fish, this.selectedMonth);
      const containsTime = this.containsTime(fish);
      const captureCheck = this.captureCheck(fish);
      const availabilityMet = this.fitsAvailability(fish);

      return containsMonth && containsTime && captureCheck && availabilityMet;
    });

    // Save the users filters
    this.saveFilters();
  }

  fitsAvailability(critter: Critter) {
    if (!this.selectedAvailability || !this.selectedMonth) {
      return true;
    }

    switch (this.selectedAvailability) {
      case 'Leaving':
        return this.isLeaving(critter);
      case 'New':
        return this.isNew(critter);
      case 'Available':
        return true;
      default:
        return false;
    }
  }

  isLeaving(critter: Critter): boolean {
    const indexOfSelectedMonth = Constants.monthsList.findIndex(month => month === this.selectedMonth);
    const nextMonthIndex = (indexOfSelectedMonth + 1) % 12;
    const nextMonth = Constants.monthsList[nextMonthIndex];
    // console.log(`Next Month: ${nextMonth}`);
    return !this.containsMonth(critter, nextMonth);
  }

  isNew(critter: Critter): boolean {
    const indexOfSelectedMonth = Constants.monthsList.findIndex(month => month === this.selectedMonth);
    const previousMonthIndex = (indexOfSelectedMonth - 1) % 12;
    const previousMonth = Constants.monthsList[previousMonthIndex];
    // console.log(`Previous Month: ${previousMonth}`);
    return !this.containsMonth(critter, previousMonth);
  }

  private captureCheck(critter: Critter) {
    if (this.hideCaptured) {
      return this.userDataService.userData.ownedBugs.indexOf(critter.CritterNumber) < 0;
    } else {
      return true;
    }
  }

  private containsMonth(critter: Critter, month: string): boolean {
    if (!month) {
      return true;
    }

    if (this.selectedHemisphere === 'Northern') {
      if (critter.NorthHemisphere.includes(month)) {
        return true;
      }
    } else {
      if (critter.SouthHemisphere.includes(month)) {
        return true;
      }
    }
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
    this.filteredCritters = this.critters;
    this.selectedMonth = '';
    this.selectedTimes = [];
    this.searchBar = '';
    this.hideCaptured = false;
    this.selectedAvailability = 'Available';
    this.saveFilters();
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
    this.updateFilter();
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

  saveFilters() {
    const userData = this.userDataService.userData;
    userData.availability = this.selectedAvailability;
    userData.filteredHemisphere = this.selectedHemisphere;
    userData.filteredMonth = this.selectedMonth;
    userData.filteredName = this.searchBar;
    userData.filteredTime = this.selectedTimes;
    userData.hideCaptured = this.hideCaptured;
    this.userDataService.save();
  }

}
