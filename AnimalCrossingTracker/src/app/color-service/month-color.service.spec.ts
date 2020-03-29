import { TestBed } from '@angular/core/testing';

import { MonthColorService } from './month-color.service';

describe('MonthColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonthColorService = TestBed.get(MonthColorService);
    expect(service).toBeTruthy();
  });
});
