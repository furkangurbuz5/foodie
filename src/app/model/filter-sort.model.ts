import {Meal} from '../interface/food-form.interface';

export interface FilterSortModel {
  filters: {
    ingredient?: string;
  };
  sort: {
    column: keyof Meal;
    direction: 'asc' | 'desc';
  };
}
