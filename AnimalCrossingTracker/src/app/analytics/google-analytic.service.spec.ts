import { TestBed } from '@angular/core/testing';

import { GoogleAnalyticService } from './google-analytic.service';

describe('GoogleAnalyticService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleAnalyticService = TestBed.get(GoogleAnalyticService);
    expect(service).toBeTruthy();
  });
});
