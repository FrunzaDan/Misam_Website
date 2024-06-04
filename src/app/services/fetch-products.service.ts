import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { NotificationService } from './notification.service';
import { SessionStorageService } from './session-storage.service';
import { Notification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  constructor(
    private http: HttpClient,
    private firebaseRealtimeDB: AngularFireDatabase,
    private sessionStorageService: SessionStorageService,
    private notificationService: NotificationService
  ) {}

  fetchProducts(): Observable<Product[]> {
    try {
      let sessionProductsList: Product[] =
        this.sessionStorageService.getProductsSession();

      if (sessionProductsList.length != 0) {
        return of(sessionProductsList);
      } else {
        let firebaseProductsList = this.fetchProductsFromFirebaseRealtimeDB();
        return firebaseProductsList;
      }
    } catch {
      console.error('Fetch error!');
      let defaultProductsList = this.fetchProductsFromNG();
      return defaultProductsList;
    }
  }

  fetchProductsFromFirebaseRealtimeDB(): Observable<Product[]> {
    try {
      let productsListObservable: Observable<Product[]> =
        this.firebaseRealtimeDB
          .list<Product>('products')
          .valueChanges()
          .pipe(
            tap({
              next: (products): void => {
                try {
                  this.sessionStorageService.setProductsSession(products);
                } catch {
                  console.error('Session storage error!');
                }
              },
              error: (error) => {
                console.error(error);
              },
            })
          );
      if (productsListObservable) {
        return productsListObservable;
      } else {
        return of([]);
      }
    } catch {
      console.error('Firebase DB error!');
      return of([]);
    }
  }

  fetchProductsFromNG(): Observable<Product[]> {
    try {
      return this.http
        .get<{ products: Product[] }>('../../assets/products.json')
        .pipe(map((data: { products: Product[] }) => data.products));
    } catch {
      console.error('NG storage error!');
      return of([]);
    }
  }
}
