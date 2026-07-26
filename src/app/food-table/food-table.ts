import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Meal } from '../interface/food-form.interface';
import { FoodService } from '../service/food.service';
import { FormsModule } from '@angular/forms';
import { FilterSortModel } from '../model/filter-sort.model';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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

  private ingredients: WritableSignal<Meal[]> = signal([]);
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
  protected filteredIngredients = computed(() => {
    const text = this.filterText().toLowerCase();

    return this.ingredients().filter((ingredient) => {
      const value = ingredient['ingredient' as keyof Meal];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(text);
      }
      return false;
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

  private calculateTotals(): void {}
}
