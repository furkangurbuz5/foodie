import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFilter } from './food-filter';

describe('FoodFilter', () => {
  let component: FoodFilter;
  let fixture: ComponentFixture<FoodFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
