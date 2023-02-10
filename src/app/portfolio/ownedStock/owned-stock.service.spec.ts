import { TestBed } from '@angular/core/testing';

import { OwnedStockService } from './owned-stock.service';

describe('OwnedStockService', () => {
  let service: OwnedStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnedStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
