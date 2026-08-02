import {Food} from '../interface/food-form.interface';

export interface IngredientResponse {
  id: string;
  name: string;
  propertiesId: number;
}

export function mapResponseToFood(ingredient: IngredientResponse): Food {
  return {
    amount: null,
    calories: null,
    carbohydrates: null,
    fats: null,
    id: ingredient.id,
    name: ingredient.name,
    protein: null
  }
}
