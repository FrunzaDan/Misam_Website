import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FetchProductsService } from '../../services/fetch-products.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../shared/filter.pipe';
import { Product } from '../../interfaces/product';
import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';

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
  public searchFilterProductsList: Product[] = [];
  selectedCategory: string | undefined;
  public currentNotifications: Notification | null = null;
  public notifications: Notification[] = [];

  constructor(
    private fetchProductsService: FetchProductsService,
    private cartService: CartService,
    private filter: FilterPipe,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.displayProductsContent();
    this.displayNumberOfProductsForCart();
  }

  async displayProductsContent(selectedCategory?: string) {
    if (!selectedCategory) {
      this.selectedCategory = undefined;
    }

    this.fetchProductsService
      .fetchProductsFromFirebaseRealtimeDB()
      .subscribe((productList: Product[]) => {
        console.log('TRIGGERED');
        this.productsList = productList;
        this.searchFilterProductsList = this.productsList;

        if (selectedCategory) {
          this.searchFilterProductsList = this.productsList.filter(
            (product: Product): boolean => product.category === selectedCategory
          );
        } else {
          this.searchFilterProductsList = this.productsList;
        }

        this.searchFilterProductsList.forEach((a: Product) => {
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

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.displayProductsContent(this.selectedCategory);
  }

  addToCart(product: Product) {
    let isSuccesful = this.cartService.addCartProduct(product);
    if (isSuccesful) {
      let notification: Notification = {
        message: `"${product.title}" a fost adăugat!`,
      };
      this.notificationService.addNotification(notification);
    }
  }

  search(keyboardEvent: Event) {
    const searchString = (keyboardEvent.target as HTMLInputElement).value;
    this.searchFilterProductsList = searchString
      ? this.filter.transform(this.productsList, searchString, 'title')
      : this.productsList;
  }
}
