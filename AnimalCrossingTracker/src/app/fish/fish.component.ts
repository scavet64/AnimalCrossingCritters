import { Component, OnInit } from '@angular/core';
import { Fish } from './fish';
import { FishService } from './fish.service';
import { FishCritterBehaviorService } from './fish-critter-behavior.service';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss']
})
export class FishComponent implements OnInit {

  fishes: Fish[];

  constructor(
    public fishService: FishService,
    public fishCritterBehaviorService: FishCritterBehaviorService
  ) { }

  ngOnInit() {
    this.fishService.loadFish().subscribe(res => {
      this.fishes = res;
    });
  }
}
