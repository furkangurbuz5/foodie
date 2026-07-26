import {Food} from '../interface/food-form.interface';

export interface FilterSortModel {
  filters: {
    ingredient?: string;
  };
  sort: {
    column: keyof Food;
    direction: 'asc' | 'desc';
  };
}
