import { TestBed } from '@angular/core/testing';

import { HousingApiService } from './housing-api.service';

describe('HousingApiService', () => {
  let service: HousingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
