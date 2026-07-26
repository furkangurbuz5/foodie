import { TestBed } from '@angular/core/testing';

import { FoodClient } from './food-client';

describe('FoodClient', () => {
  let service: FoodClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
