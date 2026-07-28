import {
  Component,
  computed,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { filterMeals } from '../../filter/meal.filter';
import { Food } from '../../interface/food-form.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'smoothie-food-filter',
  imports: [FormsModule],
  templateUrl: './food-filter.html',
  styleUrl: './food-filter.scss',
})
export class FoodFilter {
  private readonly destroy$: Subject<void> = new Subject<void>();

  private filterTextSubject = new Subject<string>();
  protected filterText = toSignal(
    this.filterTextSubject.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );
  protected filterType = signal<string>('ingredient');
  protected numericFilterType = signal<string>('calories');
  protected numericFilterOperator = signal<string>('>=');

  private numericFilterValueSubject = new Subject<string>();
  numericFilterValue = toSignal(
    this.numericFilterValueSubject.pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' },
  );

  filtered = output<Food[]>();
  foods = input.required<Food[]>();

  // private filteredFoods = computed(() => {
  //   const foods = this.foods();
  //   const text = this.filterText();
  //   const numericType = this.numericFilterType() as keyof Food;
  //   const operator = this.numericFilterOperator() as '>' | '<' | '>=' | '<=';
  //   const numericValue = parseFloat(this.numericFilterValue()) || 0;

  //   console.log('computed filteredFoods', text, foods);

  //   const filteredFoods = filterMeals(foods, text, {
  //     type: numericType,
  //     operator,
  //     value: numericValue,
  //   });

  //   return filteredFoods;
  // });

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

  private filterAndEmit() {
    const foods = this.foods();
    const text = this.filterText();
    const numericType = this.numericFilterType() as keyof Food;
    const operator = this.numericFilterOperator() as '>' | '<' | '>=' | '<=';
    const numericValue = parseFloat(this.numericFilterValue()) || 0;

    const filteredFoods = filterMeals(foods, text, {
      type: numericType,
      operator,
      value: numericValue,
    });

      this.filtered.emit(filteredFoods);
    
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

  //TODO calculate totals
  private calculateTotals(): void {}
}
