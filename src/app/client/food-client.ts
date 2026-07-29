import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FoodClient {
  private readonly httpClient: HttpClient = inject(HttpClient);


  getFoods() {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });
    return this.httpClient.get<string[]>("http://localhost:8080/ingredients", {headers})
  }
}
