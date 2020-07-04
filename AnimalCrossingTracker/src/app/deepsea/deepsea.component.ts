import { Component, OnInit } from '@angular/core';
import { DeepSea } from './deepsea';
import { DeepSeaService } from './deepsea.service';

@Component({
  selector: 'app-deepsea',
  templateUrl: './deepsea.component.html',
  styleUrls: ['./deepsea.component.scss']
})
export class DeepseaComponent implements OnInit {

  deepsea: DeepSea[];

  constructor(
    public deepSeaService: DeepSeaService
  ) { }

  ngOnInit() {
    this.deepSeaService.loadDeepSea().subscribe(res => {
      this.deepsea = res;
    });
  }

}
