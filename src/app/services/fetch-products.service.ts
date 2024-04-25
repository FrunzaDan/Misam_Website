import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { from, Observable } from 'rxjs';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';

const app = initializeApp(environment.firebaseConfig);
const db = getDatabase(app);

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  constructor(private http: HttpClient) {}

  async fetchProductsFromFirebasePromise(): Promise<Product[]> {
    const dataRef = ref(db, '/');
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const observable = from(snapshot.val());
        return snapshot.val() as Product[];
      } else {
        console.log('No data available');
        return null as any;
      }
    } catch {
      console.log('Failed to fetch!');
      return null as any;
    }
  }

  fetchProductsFromFirebase(): Observable<Product[]> {
    return new Observable<Product[]>((subscriber) => {
      this.fetchProductsFromFirebasePromise()
        .then((products) => {
          if (products !== null) {
            subscriber.next(products);
            subscriber.complete();
          } else {
            subscriber.error(
              new Error('Failed to fetch products or no data available')
            );
          }
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          // Handle rejection here (log and continue build?)
          subscriber.error(new Error('Build failed due to product data error')); // Example handling
        });
    });
  }

  fetchProductsFromLocal(): Observable<Product[]> {
    return this.http
      .get<Product[]>('../../assets/products.json')
      .pipe(map((products: Product[]) => products));
  }
}
