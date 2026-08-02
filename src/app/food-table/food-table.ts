import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal,} from '@angular/core';
import {Food} from '../interface/food-form.interface';
import {FoodService} from '../service/food.service';
import {FormsModule} from '@angular/forms';
import {FoodFilterService} from '../filter/meal.filter';
import {RouterLink} from '@angular/router';
import {finalize, take} from 'rxjs';

@Component({
  selector: 'smoothie-food-table',
  imports: [FormsModule, RouterLink],
  templateUrl: './food-table.html',
  styleUrl: './food-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodTable {
  protected foods: WritableSignal<Food[]> = signal([]);
  protected readonly isFetching: WritableSignal<boolean> = signal<boolean>(false);
  private readonly foodService: FoodService = inject(FoodService);

  //TODO move logic inside init to method
  ngOnInit() {
    this.isFetching.set(true);
    this.foodService.getFoods()
      .pipe(
        take(1),
        finalize(() => {
          this.isFetching.set(false);
        }))
      .subscribe(foods => {
        this.foods.set(foods)
      })
  }
}
