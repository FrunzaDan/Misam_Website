import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  public cartProducts: Product[] = [];
  public totalNumberOfCartProducts!: number;
  public totalPrice!: number;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.displayCartContent();
    this.displayTotalNumberOfCartProducts();
    this.displayTotalPrice();
  }

  displayCartContent() {
    this.cartService.getProductsForCartObservable().subscribe((res) => {
      this.cartProducts = res;
    });
  }

  displayTotalPrice() {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  displayTotalNumberOfCartProducts() {
    this.totalNumberOfCartProducts = this.cartService.getTotalPrice();
  }

  removeFromCart(product: Product) {
    this.cartService.removeCartProduct(product);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }
}
