import { Injectable } from '@angular/core';
import { Bug } from './bug';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private httpClient: HttpClient) { }

  public loadBugs(): Observable<Bug[]> {
    return this.httpClient.get<any>('assets/data/BugsCustom.json');
  }

  public getImagePath(bug: Bug): string {
    return `./assets/imgs/bugs/${bug.CritterNumber}.png`;
  }
}
