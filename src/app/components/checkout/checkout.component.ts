import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  public totalNumberOfCartProducts!: number;
  public totalPrice!: number;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.displayTotalNumberOfCartProducts();
    this.displayTotalPrice();
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

  handleBackToCartClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/cart']);
  }
}
