import {Component, input, InputSignal} from '@angular/core';
import {Food} from '../interface/food-form.interface';

@Component({
  selector: 'app-ingredient',
  imports: [],
  templateUrl: './ingredient.html',
  styleUrl: './ingredient.css',
})
export class Ingredient {
  ingredient: InputSignal<Food> = input.required<Food>();
}
