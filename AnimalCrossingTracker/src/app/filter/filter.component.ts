import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Constants } from '../models/constants';
import { GoogleAnalyticService } from '../analytics/google-analytic.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  months = new UntypedFormControl();
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

  @Input() selectedOrder: string;
  @Output() selectedOrderChange = new EventEmitter<string>();

  @Input() hideCaptured: boolean;
  @Output() hideCapturedChange = new EventEmitter<boolean>();

  @Input() selectedAvailability: string;
  @Output() selectedAvailabilityChange = new EventEmitter<string>();

  @Output() resetFilter = new EventEmitter<any>();
  @Output() valueChanged = new EventEmitter<any>();

  constructor(
    private googleAnalyticService: GoogleAnalyticService
  ) { }

  ngOnInit() {
  }

  resetFilters() {
    this.resetFilter.emit();
    this.googleAnalyticService.eventEmitter('filter-reset', 'critter', 'reset', 'click');
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
    this.googleAnalyticService.eventEmitter('month-changed', 'filter', 'filter', 'click');
  }

  timesChange(event) {
    this.selectedTimesChange.emit(this.selectedTimes);
    this.valueChanged.emit(event);
    this.googleAnalyticService.eventEmitter('time-changed', 'filter', 'filter', 'click');
  }

  hemisphereChange(event) {
    this.selectedHemisphere = event.value;
    this.selectedHemisphereChange.emit(this.selectedHemisphere);
    this.valueChanged.emit(event);
    this.googleAnalyticService.eventEmitter('hemi-changed', 'filter', 'filter', 'click');
  }

  selectedOrderChanged(event) {
    this.selectedOrder = event.value;
    this.selectedOrderChange.emit(this.selectedOrder);
    this.valueChanged.emit(event);
    this.googleAnalyticService.eventEmitter('order-changed', 'filter', 'filter', 'click');
  }

  hideCapturedChanged(event) {
    this.hideCaptured = event.checked;
    this.hideCapturedChange.emit(this.hideCaptured);
    this.valueChanged.emit(event);
    this.googleAnalyticService.eventEmitter('captured-changed', 'filter', 'filter', 'click');
  }

  availabilityChanged(event) {
    this.selectedAvailability = event.value;
    this.selectedAvailabilityChange.emit(this.selectedAvailability);
    this.valueChanged.emit(event);
    this.googleAnalyticService.eventEmitter('avail-changed', 'filter', 'filter', 'click');
  }

  clearAvailability() {
    this.selectedAvailability = '';
    this.selectedAvailabilityChange.emit(this.selectedAvailability);
    this.valueChanged.emit();
    this.googleAnalyticService.eventEmitter('avail-cleared', 'filter', 'filter', 'click');
  }

  setNow() {
    const now = new Date();
    this.selectedMonths = this.monthsList[now.getMonth()];
    this.selectedMonthsChange.emit(this.selectedMonths);
    this.selectedTimesChange.emit([this.timesList[now.getHours()]]);
    this.valueChanged.emit();
    this.googleAnalyticService.eventEmitter('set-now', 'filter', 'filter', 'click');
  }
}
