import {Routes} from '@angular/router';
import {FoodForm} from './food-form/food-form';
import {FoodTable} from './food-table/food-table';
import {Ingredient} from './ingredient/ingredient';

export const routes: Routes = [
  {
    title: "Food Form",
    path: "food-form",
    component: FoodForm
  },
  {
    title: "Food Table",
    path: "food-table",
    component: FoodTable
  },
  {
    title: "Ingredient",
    path: "ingredient/:name",
    component: Ingredient
  }
];
