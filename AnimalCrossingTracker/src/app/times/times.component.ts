import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent implements OnInit {

  allTime: string[] = [
    '1 a.m.',
    '2 a.m.',
    '3 a.m.',
    '4 a.m.',
    '5 a.m.',
    '6 a.m.',
    '7 a.m.',
    '8 a.m.',
    '9 a.m.',
    '10 a.m.',
    '11 a.m.',
    '12 a.m.',
    '1 p.m.',
    '2 p.m.',
    '3 p.m.',
    '4 p.m.',
    '5 p.m.',
    '6 p.m.',
    '7 p.m.',
    '8 p.m.',
    '9 p.m.',
    '10 p.m.',
    '11 p.m.',
    '12 p.m.'
  ];

  @Input() times: string[];

  constructor() { }

  ngOnInit() {
  }

  isAvailable(time): boolean {
    return this.times.filter(t => t === time).length !== 0;
  }

}
