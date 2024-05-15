import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CheckOutForm } from '../../interfaces/check-out-form';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { SendEmailService } from '../../services/send-email.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  animations: [],
})
export class CheckoutComponent implements OnInit {
  public totalNumberOfCartProducts!: number;
  public totalPrice!: number;
  showConfirmCheckout: boolean = false;
  order: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private sendEmailService: SendEmailService,
    private localStorageService: LocalStorageService
  ) {}

  submitted = false;

  checkOutForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9,12}$'),
    ]),
    town: new FormControl('', [Validators.required]),
    address_line1: new FormControl('', [Validators.required]),
    address_line2: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.checkOutForm.controls;
  }

  ngOnInit(): void {
    this.displayTotalNumberOfCartProducts();
    this.displayTotalPrice();
  }

  displayTotalPrice(): void {
    this.cartService
      .getTotalPrice()
      .subscribe((totalPriceCalculated: number) => {
        this.totalPrice = totalPriceCalculated;
      });
  }

  displayTotalNumberOfCartProducts(): void {
    this.cartService
      .getNumberOfProductsForCart()
      .subscribe((totalNumberOfProducts: number) => {
        this.totalNumberOfCartProducts = totalNumberOfProducts;
      });
  }

  handleBackToCartClick(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/cart']);
  }

  handleCloseConfirmCheckoutClick(event: Event): void {
    event.preventDefault();
    this.showConfirmCheckout = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.checkOutForm.invalid) {
      return;
    }

    let checkOutFormData: CheckOutForm = this.checkOutForm
      .value as CheckOutForm;
    this.order = this.buildOrder(checkOutFormData);

    console.log(this.order);

    this.showConfirmCheckout = true;

    // this.resetForm(checkOutFormData);
  }

  buildOrder(checkOutForm: CheckOutForm): string {
    let customer_contact_info: string =
      'Comanda: \n' +
      'Nume client: ' +
      checkOutForm.name +
      '\n' +
      'E-mail client: ' +
      checkOutForm.email +
      '\n' +
      'Telefon client: ' +
      checkOutForm.phone +
      '\n' +
      'Adresă livrare client: \n' +
      'Localitate: ' +
      checkOutForm.town +
      '\n' +
      'Stradă: ' +
      checkOutForm.address_line1 +
      '\n' +
      'Număr: ' +
      checkOutForm.address_line2 +
      '\n' +
      'Cod poștal: ' +
      checkOutForm.zip +
      '\n' +
      '--------------------' +
      '\n';

    let productString: string = 'Produse: \n';
    let customer_ordered_products: Product[] | null =
      this.localStorageService.getCartProductsLocal();
    if (customer_ordered_products) {
      for (let product of customer_ordered_products) {
        productString +=
          '\n' +
          product.title +
          ': ' +
          product.price +
          ' RON x ' +
          product.quantity +
          ' buc.';
      }
      productString +=
        '\n' +
        '--------------------' +
        '\n' +
        'Număr produse: ' +
        this.totalNumberOfCartProducts +
        ' buc.' +
        '\n' +
        'Preț total: ' +
        this.totalPrice +
        ' RON';
    }

    let order: string = customer_contact_info + '\n' + productString;

    return order;
  }

  resetForm(checkOutForm: CheckOutForm) {
    this.checkOutForm.reset();
    this.checkOutForm.controls.name.setErrors(null);
    this.checkOutForm.controls.email.setErrors(null);
    this.checkOutForm.controls.phone.setErrors(null);
    this.checkOutForm.controls.town.setErrors(null);
    this.checkOutForm.controls.address_line1.setErrors(null);
    this.checkOutForm.controls.address_line2.setErrors(null);
    this.checkOutForm.controls.zip.setErrors(null);
  }
}
