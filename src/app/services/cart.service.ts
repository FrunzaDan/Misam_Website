import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartProductsList: Product[] = [];
  public cartProductsListBehaviorSubject: BehaviorSubject<Product[]> =
    new BehaviorSubject<Product[]>([]);

  private localStorageService: LocalStorageService;

  constructor(localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService;
    this.loadCartProductsFromLocalStorage();
  }

  getProductsForCartObservable(): Observable<Product[]> {
    return this.cartProductsListBehaviorSubject.asObservable();
  }

  addCartProduct(addedProduct: Product): boolean {
    const existingProduct: Product | undefined = this.cartProductsList.find(
      (item: Product): boolean => item.id === addedProduct.id
    );

    if (existingProduct) {
      existingProduct.quantity++;
      this.updateCartStateAndStorage();
      return true;
    } else {
      addedProduct.quantity = 1;
      this.cartProductsList.push(addedProduct);
      this.updateCartStateAndStorage();
      return true;
    }
  }

  removeOneCartProduct(product: Product): boolean {
    const productIndex: number = this.cartProductsList.findIndex(
      (item: Product): boolean => item.id === product.id
    );

    if (productIndex !== -1) {
      this.cartProductsList[productIndex].quantity--;
      this.updateCartStateAndStorage();
      return true;
    }
    return false;
  }

  addOneCartProduct(product: Product): boolean {
    const productIndex: number = this.cartProductsList.findIndex(
      (item: Product): boolean => item.id === product.id
    );

    if (productIndex !== -1) {
      this.cartProductsList[productIndex].quantity++;
      this.updateCartStateAndStorage();
      return true;
    }
    return false;
  }

  removeCartProduct(product: Product): boolean {
    const productIndex: number = this.cartProductsList.findIndex(
      (item: Product): boolean => item.id === product.id
    );

    if (productIndex !== -1) {
      this.cartProductsList.splice(productIndex, 1);
      this.updateCartStateAndStorage();
      return true;
    }
    return false;
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

  removeAllCart(): boolean {
    this.cartProductsList = [];
    this.updateCartStateAndStorage();
    return true;
  }

  private updateCartStateAndStorage() {
    this.cartProductsListBehaviorSubject.next(this.cartProductsList.slice());
    this.localStorageService.setCartProductsLocal(this.cartProductsList);
  }

  private loadCartProductsFromLocalStorage() {
    const products = this.localStorageService.getCartProductsLocal();
    if (products) {
      this.cartProductsList = products;
      this.cartProductsListBehaviorSubject.next(this.cartProductsList);
    }
  }
}
