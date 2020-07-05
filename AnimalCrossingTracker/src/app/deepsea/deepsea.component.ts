import { Component, OnInit } from '@angular/core';
import { DeepSea } from './deepsea';
import { DeepSeaService } from './deepsea.service';
import { DeepSeaCritterBehaviorService } from './deep-sea-critter-behavior.service';

@Component({
  selector: 'app-deepsea',
  templateUrl: './deepsea.component.html',
  styleUrls: ['./deepsea.component.scss']
})
export class DeepseaComponent implements OnInit {

  deepsea: DeepSea[];

  constructor(
    public deepSeaService: DeepSeaService,
    public deepSeaCritterBehaviorService: DeepSeaCritterBehaviorService
  ) {}

  ngOnInit() {
    this.deepSeaService.loadDeepSea().subscribe(res => {
      this.deepsea = res;
    });
  }
}
