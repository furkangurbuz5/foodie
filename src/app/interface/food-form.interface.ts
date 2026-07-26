import {FormControl} from '@angular/forms';

export interface FoodFormModel {
  name: FormControl<string | null>
  calories: FormControl<number | null>
  amount: FormControl<number | null>
  protein: FormControl<number | null>
  fats: FormControl<number | null>
  carbohydrates: FormControl<number | null>
}

export interface Food {
  id: string | null;
  name: string | null;
  calories: number | null;
  amount: number | null;
  protein: number | null;
  fats: number | null;
  carbohydrates: number | null;
}
