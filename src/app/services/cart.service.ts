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

  getProductsForCartObservable() {
    let productList = this.getCartProductsFromLocalStorage();
    this.cartProductsListBehaviorSubject.next(productList);
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
    this.cartProductsList = this.getCartProductsFromLocalStorage();
    for (let i = this.cartProductsList.length - 1; i >= 0; i--) {
      if (product.id === this.cartProductsList[i].id) {
        this.cartProductsList.splice(i, 1);
        break;
      }
    }
    this.cartProductsListBehaviorSubject.next(this.cartProductsList);
    this.updateLocalStorage(this.cartProductsList);
  }

  getTotalPrice(): BehaviorSubject<number> {
    const cartTotalPriceBehaviorSubject = new BehaviorSubject<number>(0);

    this.getProductsForCartObservable().subscribe((cartProductsList) => {
      let totalPrice = 0;
      if (cartProductsList && cartProductsList.length > 0) {
        cartProductsList.forEach((cartProduct: Product) => {
          const totalPricePerProduct = cartProduct.price * cartProduct.quantity;
          totalPrice += totalPricePerProduct;
        });
        totalPrice = Math.round(totalPrice * 100) / 100;
      }
      cartTotalPriceBehaviorSubject.next(totalPrice);
    });

    return cartTotalPriceBehaviorSubject;
  }

  getNumberOfProductsForCart() {
    const cartProductNumberBehaviorSubject = new BehaviorSubject<number>(0);

    this.getProductsForCartObservable().subscribe((cartProductsList) => {
      if (!cartProductsList || cartProductsList.length === 0) {
        cartProductNumberBehaviorSubject.next(0);
        return;
      }

      const totalItemsInCart = cartProductsList.reduce(
        (totalQuantity, cartProduct) => totalQuantity + cartProduct.quantity,
        0
      );
      cartProductNumberBehaviorSubject.next(totalItemsInCart);
    });

    return cartProductNumberBehaviorSubject;
  }

  removeAllCart() {
    this.cartProductsList = [];
    this.cartProductsListBehaviorSubject.next(this.cartProductsList);
    this.updateLocalStorage(this.cartProductsList);
  }

  updateLocalStorage(productList: Product[]) {
    localStorage.setItem('cartProducts', JSON.stringify(productList));
  }

  getCartProductsFromLocalStorage(): Product[] {
    try {
      const cartProductsJson = localStorage.getItem('cartProducts');
      if (!cartProductsJson) {
        return [];
      }
      return JSON.parse(cartProductsJson) as Product[];
    } catch (parseError: unknown) {
      // Use a broader type for unknown errors
      console.error(
        'Error parsing cart products from local storage:',
        parseError
      );
      return [];
    }
  }
}
