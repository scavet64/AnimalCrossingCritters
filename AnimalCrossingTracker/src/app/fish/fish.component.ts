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

  public fishes: Fish[];
  public searchbar = '';

  constructor(
    public fishService: FishService,
    public monthColorService: MonthColorService
  ) { }

  ngOnInit() {
    this.fishService.loadFish().subscribe(res => {
      this.fishes = res;
    });
  }

  getMonthColor(month: string) {
    return this.monthColorService.getRandomColor(month);
  }

}
