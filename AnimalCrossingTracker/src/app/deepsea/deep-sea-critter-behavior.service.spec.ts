import { TestBed } from '@angular/core/testing';

import { DeepSeaCritterBehaviorService } from './deep-sea-critter-behavior.service';

describe('DeepSeaCritterBehaviorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeepSeaCritterBehaviorService = TestBed.get(DeepSeaCritterBehaviorService);
    expect(service).toBeTruthy();
  });
});
