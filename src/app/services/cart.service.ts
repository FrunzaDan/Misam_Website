import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartProductsList: Product[] = [];
  public productList: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  constructor() {}

  getProductsForCart() {
    return this.productList.asObservable();
  }

  addCartProduct(addedProduct: Product) {
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

    this.productList.next(this.cartProductsList.slice());
  }

  removeCartProduct(product: Product) {
    for (let i = this.cartProductsList.length - 1; i >= 0; i--) {
      if (product.id === this.cartProductsList[i].id) {
        this.cartProductsList.splice(i, 1);
        break;
      }
    }
    this.productList.next(this.cartProductsList);
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartProductsList.forEach((product: Product) => {
      const productsTotalPrice = product.price * product.quantity;
      totalPrice += productsTotalPrice;
    });
    console.log('TOTAL PRICE');
    return totalPrice;
  }

  removeAllCart() {
    this.cartProductsList = [];
    this.productList.next(this.cartProductsList);
  }
}
