import { Injectable } from '@angular/core';
import {Food} from '../interface/food-form.interface';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  foods: Food[] = [];

  addFood(food: Food) {
    this.foods.push(food);

    console.log(food);
  }

  getFoods(): Food[]{
    return this.foods;
  }
}
