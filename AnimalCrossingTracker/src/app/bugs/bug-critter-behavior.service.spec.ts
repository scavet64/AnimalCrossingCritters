import { TestBed } from '@angular/core/testing';

import { BugCritterBehaviorService } from './bug-critter-behavior.service';

describe('BugCritterBehaviorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BugCritterBehaviorService = TestBed.get(BugCritterBehaviorService);
    expect(service).toBeTruthy();
  });
});
