import {inject, Injectable} from '@angular/core';
import {Food} from '../interface/food-form.interface';
import {FoodClient} from '../client/food-client';
import {map, Observable, take} from 'rxjs';

class TestFood implements Food {
  amount: number | null;
  calories: number | null;
  carbohydrates: number | null;
  fats: number | null;
  id: string | null;
  name: string | null;
  protein: number | null;

  constructor(
    amount: number | null,
    calories: number | null,
    carbohydrates: number | null,
    fats: number | null,
    id: string | null,
    name: string | null,
    protein: number | null,
  ) {
    this.amount = amount;
    this.calories = calories;
    this.carbohydrates = carbohydrates;
    this.fats = fats;
    this.id = id;
    this.name = name;
    this.protein = protein;
  }
}

@Injectable({
  providedIn: 'root',
})
export class FoodService {

  private readonly foodClient: FoodClient = inject(FoodClient);

  addFood(food: Food): void {


  }

  getFoods(): Observable<Food[]> {
    return this.foodClient.getFoods()
      .pipe(
        take(1),
        map((foods) => {
          const food = new TestFood(
            1,
            12,
            13,
            14,
            '123',
            foods[0],
            1
          )
          const listOfFoods: Food[] = [food];
          return listOfFoods;
        })
      )
  }
}
