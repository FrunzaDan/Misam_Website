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
  public products: Product[] = [];
  public totalPrice!: number;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProductsForCart().subscribe((res) => {
      this.products = res;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeFromCart(product: Product) {
    this.cartService.removeCartProduct(product);
  }

  emptycart() {
    this.cartService.removeAllCart();
  }
}
