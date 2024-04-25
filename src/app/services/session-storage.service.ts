import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly productsSessionKey = 'productsSession';

  getProductsSession(): Product[] | null {
    if (typeof window !== 'undefined') {
      try {
        const cartProductsJson = sessionStorage.getItem(
          this.productsSessionKey
        );
        if (!cartProductsJson) {
          return null;
        }
        return JSON.parse(cartProductsJson) as Product[];
      } catch (parseError: unknown) {
        console.error(
          'Error parsing products from session storage:',
          parseError
        );
        return null;
      }
    } else {
      return null;
    }
  }

  setProductsSession(products: Product[]): void {
    console.log('SAVING... ' + products);
    sessionStorage.setItem(this.productsSessionKey, JSON.stringify(products));
  }
}
