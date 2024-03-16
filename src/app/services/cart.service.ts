import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartProductsList: Product[] = [];
  public cartProductsListBehaviorSubject: BehaviorSubject<Product[]> =
    new BehaviorSubject<Product[]>([]);

  constructor() {}

  getProductsForCart() {
    let newProductList = this.getCartProductsFromLocalStorage();
    this.cartProductsListBehaviorSubject.next(newProductList);
    return this.cartProductsListBehaviorSubject.asObservable();
  }

  addCartProduct(addedProduct: Product) {
    this.cartProductsList = this.getCartProductsFromLocalStorage();
    const existingProduct = this.cartProductsList.find(
      (existingProductItem: { title: string }) =>
        existingProductItem.title === addedProduct.title
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      addedProduct.quantity = 1;
      this.cartProductsList.push(addedProduct);
    }
    this.cartProductsListBehaviorSubject.next(this.cartProductsList.slice());
    this.updateLocalStorage(this.cartProductsList);
  }

  removeCartProduct(product: Product) {
    for (let i = this.cartProductsList.length - 1; i >= 0; i--) {
      if (product.id === this.cartProductsList[i].id) {
        this.cartProductsList.splice(i, 1);
        break;
      }
    }
    this.cartProductsListBehaviorSubject.next(this.cartProductsList);
    this.updateLocalStorage(this.cartProductsList);
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartProductsList.forEach((product: Product) => {
      const productsTotalPrice = product.price * product.quantity;
      totalPrice += productsTotalPrice;
    });
    return totalPrice;
  }

  removeAllCart() {
    this.cartProductsList = [];
    this.cartProductsListBehaviorSubject.next(this.cartProductsList);
    this.updateLocalStorage(this.cartProductsList);
  }

  updateLocalStorage(productList: Product[]) {
    localStorage.setItem('cartProducts', JSON.stringify(productList));
  }

  getCartProductsFromLocalStorage() {
    try {
      const cartProductsJson = localStorage.getItem('cartProducts');
      if (cartProductsJson) {
        return JSON.parse(cartProductsJson) as Product[];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting cart products from local storage:', error);
      return [];
    }
  }
}
