import { Component, NgModule } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';

@Component({
  standalone: true,
  imports: [ProductsListComponent],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {}
