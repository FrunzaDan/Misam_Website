import { Component, OnInit } from '@angular/core';

import { FetchProductsService } from '../../services/fetch-products.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../shared/filter.pipe';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  imports: [CommonModule, FilterPipe],
})
export class ProductsListComponent implements OnInit {
  public productList: any = [];
  filteredProductList = [];
  searchKey: string = '';
  constructor(
    private api: FetchProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });

    this.cartService.searchString.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
}
