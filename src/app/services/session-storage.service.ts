import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly productsSessionKey = 'productsSession';

  getProductsSession(): Product[] {
    if (typeof window !== 'undefined') {
      try {
        const cartProductsJson = sessionStorage.getItem(
          this.productsSessionKey
        );
        if (!cartProductsJson) {
          return [];
        }
        return JSON.parse(cartProductsJson) as Product[];
      } catch (parseError: unknown) {
        console.error(
          'Error parsing products from session storage:',
          parseError
        );
        return [];
      }
    } else {
      return [];
    }
  }

  setProductsSession(products: Product[]): void {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(
          this.productsSessionKey,
          JSON.stringify(products)
        );
      } catch (parseError: unknown) {
        console.error('Error setting products to session storage:', parseError);
      }
    }
  }
}
