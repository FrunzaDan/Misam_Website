import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  constructor(
    private http: HttpClient,
    private firebaseRealtimeDB: AngularFireDatabase,
    private sessionStorageService: SessionStorageService
  ) {}

  fetchProductsFromFirebaseRealtimeDB(): Observable<Product[]> {
    try {
      let productsListObservable: Observable<Product[]> =
        this.firebaseRealtimeDB.list<Product>('products').valueChanges();
      if (productsListObservable) {
      }
      return productsListObservable;
    } catch {
      return of([]);
    }
  }

  fetchProductsFromLocal(): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>('../../assets/products.json')
      .pipe(map((data: { products: Product[] }) => data.products));
  }
}
