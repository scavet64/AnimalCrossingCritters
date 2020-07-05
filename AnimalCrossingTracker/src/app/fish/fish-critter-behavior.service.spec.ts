import { TestBed } from '@angular/core/testing';

import { FishCritterBehaviorService } from './fish-critter-behavior.service';

describe('FishCritterBehaviorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishCritterBehaviorService = TestBed.get(FishCritterBehaviorService);
    expect(service).toBeTruthy();
  });
});
