import { Component, OnInit } from '@angular/core';
import { Fish } from './fish';
import { FishService } from './fish.service';
import { MonthColorService } from '../month-color.service';
import { UserDataService } from '../user-data/user-data.service';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss']
})
export class FishComponent implements OnInit {

  fishes: Fish[];
  filteredFish: Fish[];
  searchBar = '';
  selectedMonths: string[] = [];
  selectedTimes: string[] = [];
  selectedHemisphere = 'Northern';
  hideCaptured = false;

  constructor(
    public fishService: FishService,
    public monthColorService: MonthColorService,
    public userDataService: UserDataService
  ) { }

  ngOnInit() {
    this.fishService.loadFish().subscribe(res => {
      this.fishes = res;
      this.filteredFish = this.fishes;
    });
  }

  getMonthColor(month: string) {
    return this.monthColorService.getRandomColor(month);
  }

  updateFilter() {
    this.filteredFish = this.fishes.filter(fish => {
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

  private captureCheck(fish: Fish) {
    if (this.hideCaptured) {
      return this.userDataService.userData.ownedFish.indexOf(fish.CritterNumber) < 0;
    } else {
      return true;
    }
  }

  private containsMonth(fish: Fish) {
    if (this.selectedMonths.length === 0) {
      return true;
    }

    let contains = false;
    if (this.selectedHemisphere === "Northern") {
      this.selectedMonths.forEach(month => {
        if (fish.NorthHemisphere.includes(month)) {
          contains = true;
        }
      });
    } else {
      this.selectedMonths.forEach(month => {
        if (fish.SouthHemisphere.includes(month)) {
          contains = true;
        }
      });
    }
    return contains;
  }

  private containsTime(fish: Fish) {
    if (this.selectedTimes.length === 0) {
      return true;
    }

    let contains = false;
    this.selectedTimes.forEach(time => {
      if (fish.TimeList.includes(time)) {
        contains = true;
      }
    });
    return contains;
  }

  resetFilter() {
    this.filteredFish = this.fishes;
    this.selectedMonths = [];
    this.selectedTimes = [];
    this.searchBar = '';
    this.hideCaptured = false;
  }

  hasFish(fish: Fish) {
    return this.userDataService.userData.ownedFish.find(fishId => fishId === fish.CritterNumber) !== undefined;
  }

  ownershipChange(fish: Fish) {
    // If we have it, remove it
    const userData = this.userDataService.userData;
    if (userData.ownedFish.find(fishId => fishId === fish.CritterNumber)) {
      userData.ownedFish = userData.ownedFish.filter(fishId => fishId !== fish.CritterNumber);
    } else {
      userData.ownedFish.push(fish.CritterNumber);
    }
    this.userDataService.save();
  }

  monthsToDisplay(fish: Fish) {
    if (this.selectedHemisphere === "Northern") {
      return fish.NorthHemisphere;
    } else {
      return fish.SouthHemisphere;
    }
  }

}
