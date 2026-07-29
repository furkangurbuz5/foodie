import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal,} from '@angular/core';
import {Food} from '../interface/food-form.interface';
import {FoodService} from '../service/food.service';
import {FormsModule} from '@angular/forms';
import {FoodFilterService} from '../filter/meal.filter';

@Component({
  selector: 'smoothie-food-table',
  imports: [FormsModule],
  templateUrl: './food-table.html',
  styleUrl: './food-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodTable {
  protected foods: WritableSignal<Food[]> = signal([]);
  private readonly foodService: FoodService = inject(FoodService);
  private readonly foodFilterService: FoodFilterService = inject(FoodFilterService);

  ngOnInit() {
    this.foods.set(this.foodService.getFoods());
    this.openFoodFilterSubscription()
  }

  openFoodFilterSubscription(): void {
    this.foodFilterService._foodFilter$.pipe(

    )
      .subscribe()
  }

}
