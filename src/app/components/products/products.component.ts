import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FetchProductsService } from '../../services/fetch-products.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../shared/filter.pipe';
import { debounceTime } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, FilterPipe],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  public productList: any[] = [];
  public totalItem: number = 0;
  public searchString: string = '';
  public filteredProductList: any[] = [];

  constructor(
    private api: FetchProductsService,
    private cartService: CartService,
    private filter: FilterPipe
  ) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.filteredProductList = this.productList;
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });

    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  search(event: Event) {
    const searchString = (event.target as HTMLInputElement).value;
    this.filteredProductList = searchString
      ? this.filter.transform(this.productList, searchString, 'title')
      : this.productList;
  }
}
