import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly cartProductsKey = 'cartProductsLocal';

  getCartProductsLocal(): Product[] | null {
    if (typeof window !== 'undefined') {
      try {
        const cartProductsJson = localStorage.getItem(this.cartProductsKey);
        if (!cartProductsJson) {
          return null;
        }
        return JSON.parse(cartProductsJson) as Product[];
      } catch (parseError: unknown) {
        console.error(
          'Error parsing cart products from local storage:',
          parseError
        );
        return null;
      }
    } else {
      return null;
    }
  }

  setCartProductsLocal(products: Product[]): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.cartProductsKey, JSON.stringify(products));
      } catch (parseError: unknown) {
        console.error('Error setting products to local storage:', parseError);
      }
    }
  }
}
