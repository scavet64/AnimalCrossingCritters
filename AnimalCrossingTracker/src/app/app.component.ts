import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AnimalCrossingTracker';

  private MIN_WIDTH = 1000;
  private innerWidth: number;
  isOpened: boolean;
  isMobile: boolean;
  searchBox: string;

  sideNavMode: string;
  DESKTOP_SIDENAV = 'side';
  MOBILE_SIDENAV = 'over';

  constructor(
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sizeCheck();
  }

  sizeCheck() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < this.MIN_WIDTH) {
      this.sideNavMode = this.MOBILE_SIDENAV;
      this.isOpened = false;
      this.isMobile = true;
    } else {
      this.sideNavMode = this.DESKTOP_SIDENAV;
      this.isOpened = true;
      this.isMobile = false;
    }
  }

  ngOnInit() {
    this.sizeCheck();
  }
}
