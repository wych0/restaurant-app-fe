import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>('assets/db.json').pipe(
      map((data: any) => {
        return data.dishes;
      })
    );
  }
}
