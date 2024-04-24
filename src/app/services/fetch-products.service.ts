import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
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
    const snapshot = await get(dataRef);
    console.log('processing...');
    console.log(snapshot.val());
    return snapshot.val() as Product[];
  }

  fetchProductsFromFirebase(): Observable<Product[]> {
    return new Observable<Product[]>((subscriber) => {
      this.fetchProductsFromFirebasePromise()
        .then((products) => {
          subscriber.next(products);
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }

  fetchProductsFromLocal(): Observable<Product[]> {
    return this.http
      .get<Product[]>('../../assets/products.json')
      .pipe(map((products: Product[]) => products));
  }
}
