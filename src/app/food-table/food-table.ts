import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Food } from '../interface/food-form.interface';
import { FoodService } from '../service/food.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { filterMeals } from '../filter/meal.filter';

@Component({
  selector: 'smoothie-food-table',
  imports: [FormsModule],
  templateUrl: './food-table.html',
  styleUrl: './food-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodTable {
  private readonly foodService: FoodService = inject(FoodService);

  private readonly destroy$: Subject<void> = new Subject<void>();

  private ingredients: WritableSignal<Food[]> = signal([]);
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

  protected filteredIngredients = computed(() => {
    const text = this.filterText();
    const numericType = this.numericFilterType() as keyof Food;
    const operator = this.numericFilterOperator() as '>' | '<' | '>=' | '<=';
    const numericValue = parseFloat(this.numericFilterValue()) || 0;

    return filterMeals(this.ingredients(), text, {
      type: numericType,
      operator,
      value: numericValue,
    });
  });

  ngOnInit() {
    this.ingredients.set(this.foodService.getFoods());
    this.calculateTotals();
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

  //TODO calculate totals 
  private calculateTotals(): void {}
}
