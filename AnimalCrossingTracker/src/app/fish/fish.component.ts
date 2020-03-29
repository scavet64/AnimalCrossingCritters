import { Component, OnInit } from '@angular/core';
import { Fish } from './fish';
import { FishService } from './fish.service';
import { MonthColorService } from '../month-color.service';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss']
})
export class FishComponent implements OnInit {

  fishes: Fish[];
  filteredFish: Fish[];
  searchbar = '';
  selectedMonths: string[] = [];
  selectedTimes: string[] = [];
  selectedHemisphere = 'Northern';

  constructor(
    public fishService: FishService,
    public monthColorService: MonthColorService
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
      if (this.searchbar !== '' || !fish.Name.toLowerCase().includes(this.searchbar.toLowerCase())) {
        return false;
      }

      // Filter by month
      const containsMonth = this.containsMonth(fish);
      const containsTime = this.containsTime(fish);

      return containsMonth && containsTime;
    });
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
    this.searchbar = '';
  }

}
