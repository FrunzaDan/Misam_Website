import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Notification } from '../../interfaces/notification';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { FetchProductsService } from '../../services/fetch-products.service';
import { NotificationService } from '../../services/notification.service';
import { FilterPipe } from '../../shared/filter.pipe';

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

  private productSubscription: Subscription | null = null;
  private cartSubscription: Subscription | null = null;

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

    this.productSubscription = this.fetchProductsService
      .fetchProducts()
      .subscribe((productList: Product[]) => {
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
    this.cartSubscription = this.cartService
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
