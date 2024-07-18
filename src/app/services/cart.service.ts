import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
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

  addProductToCart(product: Product): boolean {
    const existingProductIndex: number = this.cartProductsList.findIndex(
      (item: Product): boolean => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      this.cartProductsList[existingProductIndex].quantity++;
    } else {
      product.quantity = 1;
      this.cartProductsList.push(product);
    }

    this.updateCartStateAndStorage();
    return true;
  }

  removeProductFromCart(product: Product): boolean {
    const productIndex: number = this.cartProductsList.findIndex(
      (item: Product): boolean => item.id === product.id
    );

    if (productIndex === -1) {
      console.warn(`Product with id ${product.id} not found in cart`);
      return false;
    }

    this.cartProductsList[productIndex].quantity--;
    if (this.cartProductsList[productIndex].quantity <= 0) {
      this.cartProductsList.splice(productIndex, 1);
    }

    this.updateCartStateAndStorage();
    return true;
  }

  removeProductsFromCart(product: Product): boolean {
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

  private calculateTotalPrice(cartProducts: Product[]): number {
    return cartProducts.reduce(
      (acc: number, product: Product): number =>
        acc + product.price * product.quantity,
      0
    );
  }

  getTotalPrice(): BehaviorSubject<number> {
    const totalPriceBehaviorSubject = new BehaviorSubject<number>(0);

    this.getProductsForCartObservable().subscribe(
      (cartProductsList: Product[]): void => {
        const totalPrice: number = this.calculateTotalPrice(cartProductsList);
        totalPriceBehaviorSubject.next(Math.round(totalPrice * 100) / 100);
      }
    );

    return totalPriceBehaviorSubject;
  }

  getNumberOfProductsForCart(): BehaviorSubject<number> {
    const cartProductNumberBehaviorSubject = new BehaviorSubject<number>(0);
    this.getProductsForCartObservable().subscribe(
      (cartProductsList: Product[]): void => {
        if (!cartProductsList || cartProductsList.length === 0) {
          cartProductNumberBehaviorSubject.next(0);
          return;
        }
        const totalItemsInCart: number = cartProductsList.reduce(
          (totalQuantity: number, cartProduct: Product): number =>
            totalQuantity + cartProduct.quantity,
          0
        );
        cartProductNumberBehaviorSubject.next(totalItemsInCart);
      }
    );
    return cartProductNumberBehaviorSubject;
  }

  removeAllCart(): boolean {
    this.cartProductsList = [];
    this.updateCartStateAndStorage();
    return true;
  }

  private updateCartStateAndStorage(): void {
    this.cartProductsListBehaviorSubject.next(this.cartProductsList.slice());
    this.localStorageService.setCartProductsLocal(this.cartProductsList);
  }

  private loadCartProductsFromLocalStorage(): void {
    const products: Product[] | null =
      this.localStorageService.getCartProductsLocal();
    if (products) {
      this.cartProductsList = products;
      this.cartProductsListBehaviorSubject.next(this.cartProductsList);
    }
  }
}
