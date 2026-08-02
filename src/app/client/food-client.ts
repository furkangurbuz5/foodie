import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IngredientResponse} from '../dto/ingredient-response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getFoods(): Observable<IngredientResponse[]> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });
    return this.httpClient.get<IngredientResponse[]>("http://localhost:8080/api/ingredients", {headers})
  }
}
