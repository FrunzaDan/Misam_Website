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
import { ContactMeForm } from '../../interfaces/contact-me-form';
import { CartService } from '../../services/cart.service';
import { SendEmailService } from '../../services/send-email.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  public totalNumberOfCartProducts!: number;
  public totalPrice!: number;

  constructor(
    private cartService: CartService,
    private router: Router,
    private sendEmailService: SendEmailService
  ) {}

  submitted = false;

  checkOutForm = new FormGroup({
    from_name: new FormControl('', [Validators.required]),
    from_email: new FormControl('', [Validators.required, Validators.email]),
    from_phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9,12}$'),
    ]),
    from_town: new FormControl('', [Validators.required]),
    from_street: new FormControl('', [Validators.required]),
    from_street_number: new FormControl('', [Validators.required]),
    from_zip: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.checkOutForm.controls;
  }

  ngOnInit(): void {
    this.displayTotalNumberOfCartProducts();
    this.displayTotalPrice();
  }

  displayTotalPrice() {
    this.cartService.getTotalPrice().subscribe((totalPriceCalculated) => {
      this.totalPrice = totalPriceCalculated;
    });
  }

  displayTotalNumberOfCartProducts() {
    this.cartService
      .getNumberOfProductsForCart()
      .subscribe((totalNumberOfProducts) => {
        this.totalNumberOfCartProducts = totalNumberOfProducts;
      });
  }

  handleBackToCartClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/cart']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkOutForm.invalid) {
      return;
    }
    let responseCodePromise: Promise<number> =
      this.sendEmailService.sendEmailJS(
        this.checkOutForm.value as ContactMeForm
      );
    responseCodePromise.then((responseCode) => {
      if (responseCode === 200) {
        this.checkOutForm.reset();
        this.checkOutForm.controls.from_name.setErrors(null);
        this.checkOutForm.controls.from_email.setErrors(null);
        this.checkOutForm.controls.from_phone.setErrors(null);
        this.checkOutForm.controls.from_town.setErrors(null);
        this.checkOutForm.controls.from_street.setErrors(null);
        this.checkOutForm.controls.from_street_number.setErrors(null);
        this.checkOutForm.controls.from_zip.setErrors(null);
      } else {
      }
    });
  }
}
