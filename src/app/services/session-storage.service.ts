import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly productsKey = 'products';

  getProducts(): Product[] | null {
    if (typeof window !== 'undefined') {
      try {
        const cartProductsJson = sessionStorage.getItem(this.productsKey);
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

  setProducts(products: Product[]): void {
    sessionStorage.setItem(this.productsKey, JSON.stringify(products));
  }
}
