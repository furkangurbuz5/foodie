import { Injectable } from '@angular/core';
import {Food} from '../interface/food-form.interface';

@Injectable({
  providedIn: 'root',
})
export class FoodService {

  addFood(food: Food): void  {


  }

  getFoods(): Food[]{
    return [];
  }
}
