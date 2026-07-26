import {ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {Meal} from '../interface/food-form.interface';
import {FoodService} from '../service/food.service';
import {FormsModule} from '@angular/forms';
import {FilterSortModel} from '../model/filter-sort.model';

@Component({
  selector: 'smoothie-food-table',
  imports: [
    FormsModule
  ],
  templateUrl: './food-table.html',
  styleUrl: './food-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodTable {
  private readonly foodService: FoodService = inject(FoodService);

  protected ingredients: WritableSignal<Meal[]> = signal([]);

  searchTerm: string = '';
  initialFilterOn: string = 'ingredient';

  ngOnInit() {
    this.ingredients.set(this.foodService.getFoods());
    this.calculateTotals();
  }

  protected onFilterChange(on: string){
    console.log(on);
  }

  private calculateTotals(): void {
  }

}
