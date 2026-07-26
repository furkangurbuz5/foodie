import { Food } from '../interface/food-form.interface';

/**
 * Filters an array of Meals based on text and numeric criteria.
 *
 * @param foods - The array of Meals to filter.
 * @param textFilter - The text to filter by (e.g., ingredient name).
 * @param numericFilter - An object containing the numeric filter criteria:
 *   - `type`: The field to filter by (e.g., "calories", "protein").
 *   - `operator`: The comparison operator (e.g., ">", "<=", etc.).
 *   - `value`: The numeric value to compare against.
 * @returns The filtered array of Meals.
 */
export function filterMeals(
  foods: Food[],
  textFilter: string,
  numericFilter: {
    type: keyof Food;
    operator: '>' | '<' | '>=' | '<=';
    value: number;
  },
): Food[] {
  const text = textFilter.toLowerCase();
  const { type, operator, value } = numericFilter;

  return foods.filter((food) => {
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
  });
}
