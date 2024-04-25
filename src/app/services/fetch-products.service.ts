import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  constructor(
    private http: HttpClient,
    private firebaseRealtimeDB: AngularFireDatabase
  ) {}

  fetchProductsFromFirebaseRealtimeDB(): Observable<Product[]> {
    try {
      let productsListObservable: Observable<Product[]> =
        this.firebaseRealtimeDB.list<Product>('products').valueChanges();
      return productsListObservable;
    } catch {
      return of([]);
    }
  }

  fetchProductsFromLocal(): Observable<Product[]> {
    return this.http
      .get<Product[]>('../../assets/products.json')
      .pipe(map((products: Product[]) => products));
  }
}
