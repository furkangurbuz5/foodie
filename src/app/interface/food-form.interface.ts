import {FormControl} from '@angular/forms';

export interface MealForm {
  ingredient: FormControl<string | null>
  calories: FormControl<number | null>
  amount: FormControl<number | null>
  protein: FormControl<number | null>
  fats: FormControl<number | null>
  carbohydrates: FormControl<number | null>
}

export interface Meal {
  id: string | null;
  ingredient: string | null;
  calories: number | null;
  amount: number | null;
  protein: number | null;
  fats: number | null;
  carbohydrates: number | null;
}
