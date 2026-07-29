import {Food} from '../interface/food-form.interface';

import {Injectable, input, OnDestroy, OnInit, output, signal,} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, takeUntil, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root',
})
export class FoodFilterService implements OnInit, OnDestroy {
  filtered = output<Food[]>();
  foods = input.required<Food[]>();
  protected filterType = signal<string>('ingredient');
  protected numericFilterType = signal<string>('calories');
  protected numericFilterOperator = signal<string>('>=');
  private readonly destroy$: Subject<void> = new Subject<void>();
  private filterTextSubject = new Subject<string>();
  protected filterText = toSignal(
    this.filterTextSubject.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged(),
    ),
    {initialValue: ''},
  );
  private numericFilterValueSubject = new Subject<string>();
  numericFilterValue = toSignal(
    this.numericFilterValueSubject.pipe(debounceTime(300), distinctUntilChanged()),
    {initialValue: ''},
  );

  ngOnInit() {
    this.filterTextSubject
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        tap((text) => {
          console.log(text);
          this.filterAndEmit();
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  protected updateFilterText(filterText: string): void {
    this.filterTextSubject.next(filterText);
  }

  protected updateFilterType(filtertype: string): void {
    this.filterType.set(filtertype);
  }

  protected updateNumericFilterType(filterType: string): void {
    this.numericFilterType.set(filterType);
  }

  protected updateNumericFilterOperator(filterOperator: string): void {
    this.numericFilterOperator.set(filterOperator);
  }

  protected updateNumericFilterValue(filterValue: string): void {
    this.numericFilterValueSubject.next(filterValue);
  }

  private filterAndEmit() {
    const foods = this.foods();
    const text = this.filterText();
    const numericType = this.numericFilterType() as keyof Food;
    const operator = this.numericFilterOperator() as '>' | '<' | '>=' | '<=';
    const numericValue = parseFloat(this.numericFilterValue()) || 0;

    const filteredFoods = this.filterMeals(foods, text, {
      type: numericType,
      operator,
      value: numericValue,
    });

    this.filtered.emit(filteredFoods);
  }

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
  private filterMeals(
    foods: Food[],
    textFilter: string,
    numericFilter: {
      type: keyof Food;
      operator: '>' | '<' | '>=' | '<=';
      value: number;
    },
  ): Food[] {
    const text = textFilter.toLowerCase();
    const {type, operator, value} = numericFilter;

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
}

