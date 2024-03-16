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
  public productList: Product[] = [];
  public totalNumberOfProducts: number = 0;
  public totalPrice: number = 0;
  public searchString: string = '';
  public filteredProductList: Product[] = [];

  constructor(
    private api: FetchProductsService,
    private cartService: CartService,
    private filter: FilterPipe
  ) {}

  ngOnInit(): void {
    this.api.getProductsForDisplay().subscribe((productsList: Product[]) => {
      this.productList = productsList;
      this.filteredProductList = this.productList;
      this.productList.forEach((a: Product) => {
        Object.assign(a, { quantity: a.quantity, total: a.price });
      });
    });

    this.cartService
      .getProductsForCart()
      .subscribe((productsList: Product[]) => {
        this.totalNumberOfProducts = productsList.reduce(
          (totalQuantity, product) => {
            return totalQuantity + product.quantity;
          },
          0
        );
      });
  }

  addToCart(product: Product) {
    this.cartService.addCartProduct(product);
  }

  search(event: Event) {
    const searchString = (event.target as HTMLInputElement).value;
    this.filteredProductList = searchString
      ? this.filter.transform(this.productList, searchString, 'title')
      : this.productList;
  }
}
