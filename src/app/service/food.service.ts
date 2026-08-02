import {inject, Injectable} from '@angular/core';
import {Food} from '../interface/food-form.interface';
import {FoodClient} from '../client/food-client';
import {map, Observable, take} from 'rxjs';
import {IngredientResponse, mapResponseToFood} from '../dto/ingredient-response';

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

  getFoodById(id: string): Observable<Food> {
    return this.foodClient.getFoodById(id)
      .pipe(
        take(1),
        map((food: IngredientResponse): Food => {
          return mapResponseToFood(food);
        })
      )
  }

  getFoods(): Observable<Food[]> {
    return this.foodClient.getFoods()
      .pipe(
        take(1),
        map((foods: IngredientResponse[]): Food[] => {
          return foods.map(mapResponseToFood)
        })
      )
  }
}
