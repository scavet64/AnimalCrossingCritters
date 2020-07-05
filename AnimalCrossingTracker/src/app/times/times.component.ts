import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent implements OnInit {

  allTime: string[] = [
    '1am',
    '2am',
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12am',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm',
    '12pm'
  ];

  @Input() times: string[];

  constructor() { }

  ngOnInit() {
  }

  isAvailable(time): boolean {
    return this.times.filter(t => t === time).length !== 0;
  }

}
