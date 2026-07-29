import {Food} from '../interface/food-form.interface';
import {Injectable,} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FoodFilterService {

  _foodFilter$: Subject<Food[]> = new Subject<Food[]>();


  private filterFoods(
    foods: Food[],
    textFilter: string,
    numericFilter: {
      type: keyof Food;
      operator: '>' | '<' | '>=' | '<=';
      value: number;
    },
  ): void {
    const text = textFilter.toLowerCase();
    const {type, operator, value} = numericFilter;

    this._foodFilter$.next(foods.filter((food) => {
      let matchesText = true;
      if (food.name) {
        matchesText = food.name.toLowerCase().includes(text);
      }

      const numericValueToCompare = food[type] as number;
      let matchesNumeric = true;
      if (!isNaN(value)) {
        switch (operator) {
          case '>':
            matchesNumeric = numericValueToCompare > value;
            break;
          case '<':
            matchesNumeric = numericValueToCompare < value;
            break;
          case '>=':
            matchesNumeric = numericValueToCompare >= value;
            break;
          case '<=':
            matchesNumeric = numericValueToCompare <= value;
            break;
          default:
            matchesNumeric = true;
        }
      }

      return matchesText && matchesNumeric;
    }))
  }
}

