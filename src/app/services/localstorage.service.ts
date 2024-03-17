import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly cartProductsKey = 'cartProducts';

  getCartProducts(): Product[] | null {
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
  }

  setCartProducts(products: Product[]): void {
    localStorage.setItem(this.cartProductsKey, JSON.stringify(products));
  }
}
