import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IngredientResponse} from '../dto/ingredient-response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodClient {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200'
  });

  getFoods(): Observable<IngredientResponse[]> {
    return this.httpClient.get<IngredientResponse[]>("http://localhost:8080/api/ingredients", {headers: this.headers})
  }

  getFoodById(id: string): Observable<IngredientResponse> {
    return this.httpClient.get<IngredientResponse>(`http://localhost:8080/api/ingredient/${id}`, {headers: this.headers})
  }
}
