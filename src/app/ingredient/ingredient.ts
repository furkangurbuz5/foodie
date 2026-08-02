import {Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {finalize, take} from 'rxjs';

@Component({
  selector: 'app-ingredient',
  imports: [],
  templateUrl: './ingredient.html',
  styleUrl: './ingredient.css',
})
export class Ingredient {
  ingredient: WritableSignal<string | null> = signal<string | null>(null);
  isFetching: WritableSignal<boolean> = signal<boolean>(false);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.isFetching.set(true);
    this.route.params.pipe(take(1), finalize(() => {
      this.isFetching.set(false)
    })).subscribe(params => {
      this.ingredient.set(params['name']);
    })
  }


}
