import { Injectable } from '@angular/core';
import { Bug } from './bug';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  public fish: Bug[];

  constructor(private httpClient: HttpClient) { }

  public loadBugs(): Observable<Bug[]> {
    if (!this.fish) {
      return this.httpClient.get<any>('assets/data/BugsCustom.json');
    } else {
      return Observable.create(observe => {
        return this.fish;
      });
    }
  }

  public getImagePath(bug: Bug): string {
    return `./assets/imgs/bugs/${bug.CritterNumber}.png`;
  }
}
