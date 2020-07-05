import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() clickedTab = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.clickedTab.emit();
  }

}
