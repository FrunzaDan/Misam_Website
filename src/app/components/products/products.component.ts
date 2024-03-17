import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FetchProductsService } from '../../services/fetch-products.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../shared/filter.pipe';
import { Product } from '../../interfaces/product';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, FilterPipe],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  public productsList: Product[] = [];
  public totalNumberOfCartProducts: number = 0;
  public totalPrice: number = 0;
  public searchString: string = '';
  public filteredProductList: Product[] = [];

  constructor(
    private fetchProductsService: FetchProductsService,
    private cartService: CartService,
    private filter: FilterPipe
  ) {}

  ngOnInit(): void {
    this.displayProductsContent();
    this.displayNumberOfProductsForCart();
  }

  displayProductsContent() {
    this.fetchProductsService
      .getProductsForDisplay()
      .subscribe((productList) => {
        this.productsList = productList;
        this.filteredProductList = this.productsList;
        this.productsList.forEach((a: Product) => {
          Object.assign(a, { quantity: a.quantity, total: a.price });
        });
      });
  }

  displayNumberOfProductsForCart() {
    this.cartService
      .getNumberOfProductsForCart()
      .subscribe((totalNumberOfProducts) => {
        this.totalNumberOfCartProducts = totalNumberOfProducts;
      });
  }

  addToCart(product: Product) {
    this.cartService.addCartProduct(product);
  }

  search(keyboardEvent: Event) {
    const searchString = (keyboardEvent.target as HTMLInputElement).value;
    this.filteredProductList = searchString
      ? this.filter.transform(this.productsList, searchString, 'title')
      : this.productsList;
  }
}
