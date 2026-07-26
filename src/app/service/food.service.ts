import { Injectable } from '@angular/core';
import {Meal} from '../interface/food-form.interface';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  foods: Meal[] = [];

  addFood(food: Meal) {
    this.foods.push(food);

    console.log(food);
  }

  getFoods(): Meal[]{
    return this.foods;
  }
}
