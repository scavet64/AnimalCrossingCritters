import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Constants } from '../models/constants';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  months = new FormControl();
  timesList = Constants.timesList;
  monthsList = Constants.monthsList;

  @Input() selectedName: string;
  @Output() selectedNameChange = new EventEmitter<string>();

  @Input() selectedMonths: string;
  @Output() selectedMonthsChange = new EventEmitter<string>();

  @Input() selectedTimes: string[];
  @Output() selectedTimesChange = new EventEmitter<string[]>();

  @Input() selectedHemisphere: string;
  @Output() selectedHemisphereChange = new EventEmitter<string>();

  @Input() hideCaptured: boolean;
  @Output() hideCapturedChange = new EventEmitter<boolean>();

  @Input() selectedAvailability: string;
  @Output() selectedAvailabilityChange = new EventEmitter<string>();

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
    this.selectedName = event.target.value;
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
    this.selectedHemisphere = event.value;
    this.selectedHemisphereChange.emit(this.selectedHemisphere);
    this.valueChanged.emit(event);
  }

  hideCapturedChanged(event) {
    this.hideCaptured = event.checked;
    this.hideCapturedChange.emit(this.hideCaptured);
    this.valueChanged.emit(event);
  }

  availabilityChanged(event) {
    this.selectedAvailability = event.value;
    this.selectedAvailabilityChange.emit(this.selectedAvailability);
    this.valueChanged.emit(event);
  }

  clearAvailability() {
    this.selectedAvailability = '';
    this.selectedAvailabilityChange.emit(this.selectedAvailability);
    this.valueChanged.emit();
  }

  setNow() {
    const now = new Date();
    this.selectedMonths = this.monthsList[now.getMonth()];
    this.selectedMonthsChange.emit(this.selectedMonths);
    this.selectedTimesChange.emit([this.timesList[now.getHours()]]);
    this.valueChanged.emit();
  }
}
