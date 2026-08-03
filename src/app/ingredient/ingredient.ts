import {Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {finalize, Observable, switchMap, take, tap} from 'rxjs';
import {FoodService} from '../service/food.service';
import {Food} from '../interface/food-form.interface';

@Component({
  selector: 'app-ingredient',
  imports: [],
  templateUrl: './ingredient.html',
  styleUrl: './ingredient.css',
})
export class Ingredient {
  food: WritableSignal<Food | null> = signal<Food | null>(null);
  isFetching: WritableSignal<boolean> = signal<boolean>(false);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly foodService: FoodService = inject(FoodService);

  ngOnInit(): void {
    this.isFetching.set(true);
    this.route.params.pipe(
      take(1),
      switchMap((params: Params): Observable<Food> => {
        return this.foodService.getFoodById(params['id']);
      }),
      tap((food: Food): void => {
        this.food.set(food);
      }),
      finalize(() => {
        this.isFetching.set(false)
      })
    ).subscribe(params => {

    })
  }


}
