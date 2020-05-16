import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InformationComponent } from './information/information.component';
import { GoogleAnalyticService } from './analytics/google-analytic.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Animal Crossing Critters: by Scavettapps';

  private MIN_WIDTH = 1000;
  private innerWidth: number;
  isOpened: boolean;
  isMobile: boolean;
  searchBox: string;

  sideNavMode: string;
  DESKTOP_SIDENAV = 'side';
  MOBILE_SIDENAV = 'over';

  constructor(
    private dialog: MatDialog,
    private googleAnalyticService: GoogleAnalyticService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.googleAnalyticService.pageRouted(event.urlAfterRedirects);
      }
    });
  }

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

  infoClicked() {
    const dialogRef = this.dialog.open(InformationComponent, {
      width: '720px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
