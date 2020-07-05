import { TestBed } from '@angular/core/testing';

import { DeepSeaService } from './deepsea.service';

describe('DeepseaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeepSeaService = TestBed.get(DeepSeaService);
    expect(service).toBeTruthy();
  });
});
