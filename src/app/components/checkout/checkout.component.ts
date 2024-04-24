import { CartService } from '../../services/cart.service';
import { CheckOutForm } from '../../interfaces/check-out-form';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactMeForm } from '../../interfaces/contact-me-form';
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
    private formBuilder: FormBuilder,
    private sendEmailService: SendEmailService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  submitted = false;

  checkOutForm = new FormGroup({
    from_name: new FormControl('', [Validators.required]),
    from_email: new FormControl('', [Validators.required, Validators.email]),
    from_tel: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9,12}$'),
    ]),
    from_message: new FormControl('', [Validators.required]),
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
        this.checkOutForm.controls.from_tel.setErrors(null);
        this.checkOutForm.controls.from_message.setErrors(null);
      } else {
      }
    });
  }
}
