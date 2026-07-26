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
import { FoodFilter } from './food-filter/food-filter';

@Component({
  selector: 'smoothie-food-table',
  imports: [FormsModule, FoodFilter],
  templateUrl: './food-table.html',
  styleUrl: './food-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodTable {
  private readonly foodService: FoodService = inject(FoodService);

  protected foods: WritableSignal<Food[]> = signal([]);

  ngOnInit() {
    this.foods.set(this.foodService.getFoods());
  }

  protected updateFoodTable(foods: Food[]){
    console.log('updateFoodTable')
    this.foods.set(foods)
  }
}
