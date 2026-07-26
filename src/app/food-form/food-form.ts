import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FoodService} from '../service/food.service';
import {Meal, MealForm} from '../interface/food-form.interface';
import {v7} from 'uuid';
import {combineLatest, tap} from 'rxjs';

@Component({
  selector: 'smoothie-food-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './food-form.html',
  styleUrl: './food-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodForm {
  protected isFoodAdded: WritableSignal<boolean> = signal(false);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder)
  protected mealForm: FormGroup<MealForm> = this.fb.group({
    ingredient: new FormControl('', Validators.required),
    calories: new FormControl({value: 0, disabled: true},
      Validators.required),
    amount: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]),
    protein: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]),
    fats: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]),
    carbohydrates: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]),
  })
  private readonly foodService: FoodService = inject(FoodService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.openCaloriesCalculationSubscription();
    this.mealForm.reset();
  }

  protected addMeal(): void {
    this.foodService.addFood(this.createMealFromFormGroup(this.mealForm));
    this.isFoodAdded.set(true);
    this.mealForm.reset();
  }

  protected fillFormTest() {
    this.mealForm.patchValue({
      ingredient: 'Test ingredient',
      amount: Math.floor(Math.floor(Math.random() * 10)),
      // calories: 240,
      carbohydrates: Math.floor(Math.random() * 200),
      fats: Math.floor(Math.random() * 50),
      protein: Math.floor(Math.random() * 100)
    })
    this.addMeal();
  }

  private createMealFromFormGroup(mealForm: FormGroup<MealForm>): Meal {
    return {
      id: v7(),
      ingredient: mealForm.controls.ingredient.value,
      amount: mealForm.controls.amount.value,
      calories: mealForm.controls.calories.value,
      carbohydrates: mealForm.controls.carbohydrates.value,
      fats: mealForm.controls.fats.value,
      protein: mealForm.controls.protein.value
    }
  }

  private openCaloriesCalculationSubscription() {
    const caloriesCalculationSubscription =
      combineLatest([
        this.mealForm.controls.amount.valueChanges,
        this.mealForm.controls.protein.valueChanges,
        this.mealForm.controls.fats.valueChanges,
        this.mealForm.controls.carbohydrates.valueChanges,
      ]).pipe(
        tap(([amount, protein, fats, carbohydrates]) => {
          if (!!amount && !!protein && !!fats && !!carbohydrates) {
            this.mealForm.controls.calories.setValue(
              this.calculateCaloriesFromMacros(
                amount, protein, fats, carbohydrates
              ))
          } else {
            this.mealForm.controls.calories.reset()
          }
        })
      ).subscribe()
    this.destroyRef.onDestroy(() => {
      caloriesCalculationSubscription.unsubscribe();
    })
  }

  private calculateCaloriesFromMacros(
    amount: number, protein: number, fats: number, carbohydrates: number
  ): number {
    return (
      (fats * 9) +
      (carbohydrates * 4) +
      (protein * 4)
    ) * amount
  }
}
