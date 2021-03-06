import { Component, OnInit } from '@angular/core';
import { BugService } from './bug.service';
import { Bug } from './bug';
import { BugCritterBehaviorService } from './bug-critter-behavior.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit {

  bugs: Bug[] = [];

  constructor(
    public bugService: BugService,
    public bugCritterBehaviorService: BugCritterBehaviorService
  ) {}

  ngOnInit() {
    this.bugService.loadBugs().subscribe(res => {
      this.bugs = res;
    });
  }
}
