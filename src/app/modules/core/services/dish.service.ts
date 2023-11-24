import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetDishesParams, GetDishesResponse } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private apiUrl = `${environment.apiUrl}/dish`;

  constructor(private http: HttpClient) {}

  getAll(paramsObject: GetDishesParams): Observable<GetDishesResponse> {
    let params = new HttpParams({
      fromObject: {
        page: paramsObject.page,
        size: paramsObject.size,
      },
    });
    if (paramsObject.sort) {
      params = params
        .append('sort', paramsObject.sort)
        .append('dir', paramsObject.dir);
    }
    if (paramsObject.type) {
      params = params.append('type', paramsObject.type);
    }
    if (paramsObject.term) {
      params = params.append('term', paramsObject.term);
    }
    if (paramsObject.isDisplayed) {
      params = params.append('isDisplayed', paramsObject.isDisplayed);
    }
    return this.http.get<GetDishesResponse>(`${this.apiUrl}`, {
      params,
    });
  }
}
