import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthColorService {

  constructor() { }

  getMonthColor(month: string) {
    switch (month) {
      case 'January':
        return '#3399ff';
      case 'February':
        return '#ff66cc';
      case 'March':
        return '#ff6666';
      case 'April':
        return '#ffff99';
      case 'May':
        return '#99ff66';
      case 'June':
        return '#6666ff';
      case 'July':
        return '#00ff00';
      case 'August':
        return '#99ff66';
      case 'September':
        return '#ffcc00';
      case 'October':
        return '#ff6600';
      case 'November':
        return '#ff0066';
      case 'December':
        return '#33cc33';
    }
  }

  getRandomColor(seed) {
    return `hsla(${this.hashCode(seed) % 360},70%,70%,0.8)`;
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash * 32) - hash);
    }
    return hash;
  }
}
