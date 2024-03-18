import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DeliveryInfoComponent } from './components/delivery-info/delivery-info.component';
import { ReturnInfoComponent } from './components/return-info/return-info.component';
import { TermsInfoComponent } from './components/terms-info/terms-info.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'delivery',
    component: DeliveryInfoComponent,
  },
  {
    path: 'return',
    component: ReturnInfoComponent,
  },
  {
    path: 'terms',
    component: TermsInfoComponent,
  },
];
