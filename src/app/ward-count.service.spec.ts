import { TestBed } from '@angular/core/testing';

import { WardCountService } from './ward-count.service';

describe('WardCountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WardCountService = TestBed.get(WardCountService);
    expect(service).toBeTruthy();
  });
});
