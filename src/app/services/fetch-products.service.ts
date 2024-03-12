import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<any>('../../assets/products.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
