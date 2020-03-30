import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() placeholder: string;
  @Input() query: string;
  @Input() expanded = true;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  searchButton(event) {
    this.searchEvent.emit(event.target.value);
  }

  clicked() {
    this.expanded = !this.expanded;
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.searchButton(event);
    }
  }
}
