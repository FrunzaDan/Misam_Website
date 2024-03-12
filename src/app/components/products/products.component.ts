import { Component, OnInit } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [ProductsListComponent, RouterModule],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  public totalItem: number = 0;
  public searchTerm!: string;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
}
