import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';
import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';

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
  public currentNotifications: Notification | null = null;
  public notifications: Notification[] = [];

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

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
    this.cartService.getTotalPrice().subscribe((totalPriceCalculated) => {
      this.totalPrice = totalPriceCalculated;
    });
  }

  displayTotalNumberOfCartProducts() {
    this.cartService
      .getNumberOfProductsForCart()
      .subscribe((totalNumberOfProducts) => {
        this.totalNumberOfCartProducts = totalNumberOfProducts;
      });
  }

  removeFromCart(product: Product) {
    let isSuccesful = this.cartService.removeCartProduct(product);
    if (isSuccesful) {
      let notification: Notification = {
        message: `"${product.title}" a fost șters!`,
      };
      this.notificationService.addNotification(notification);
    }
    this.cartService.getTotalPrice().subscribe((totalPriceCalculated) => {
      this.totalPrice = totalPriceCalculated;
    });
  }

  emptyCart() {
    let isSuccesful = this.cartService.removeAllCart();
    if (isSuccesful) {
      let notification: Notification = {
        message: `Coșul a fost golit!`,
      };
      this.notificationService.addNotification(notification);
    }
  }
}
