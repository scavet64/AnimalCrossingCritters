import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  months = new FormControl();
  monthsList: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  timesList: string[] = [
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

  @Input() selectedName: string;
  @Output() selectedNameChange = new EventEmitter<string>();

  @Input() selectedMonths: string[];
  @Output() selectedMonthsChange = new EventEmitter<string[]>();

  @Input() selectedTimes: string[];
  @Output() selectedTimesChange = new EventEmitter<string[]>();

  @Input() selectedHemisphere: string;
  @Output() selectedHemisphereChange = new EventEmitter<string>();

  @Output() resetFilter = new EventEmitter<any>();
  @Output() valueChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  resetFilters() {
    this.resetFilter.emit();
  }

  valueChangedEvent(event) {
    this.valueChanged.emit(event);
  }

  nameChange(event) {
    this.selectedNameChange.emit(this.selectedName);
    this.valueChanged.emit(event);
  }

  monthsChange(event) {
    this.selectedMonthsChange.emit(this.selectedMonths);
    this.valueChanged.emit(event);
  }

  timesChange(event) {
    this.selectedTimesChange.emit(this.selectedTimes);
    this.valueChanged.emit(event);
  }

  hemisphereChange(event) {
    this.selectedHemisphereChange.emit(this.selectedHemisphere);
    this.valueChanged.emit(event);
  }
}
