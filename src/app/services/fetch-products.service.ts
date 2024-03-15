import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http
      .get<Product[]>('../../assets/products.json')
      .pipe(map((products: Product[]) => products));
  }
}
