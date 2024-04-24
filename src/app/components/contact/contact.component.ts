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
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sendEmailService: SendEmailService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  submitted = false;

  contactMeForm = new FormGroup({
    from_name: new FormControl('', [Validators.required]),
    from_email: new FormControl('', [Validators.required, Validators.email]),
    from_tel: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9,12}$'),
    ]),
    from_message: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.contactMeForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.contactMeForm.invalid) {
      return;
    }
    let responseCodePromise: Promise<number> =
      this.sendEmailService.sendEmailJS(
        this.contactMeForm.value as ContactMeForm
      );
    responseCodePromise.then((responseCode) => {
      if (responseCode === 200) {
        this.contactMeForm.reset();
        this.contactMeForm.controls.from_name.setErrors(null);
        this.contactMeForm.controls.from_email.setErrors(null);
        this.contactMeForm.controls.from_tel.setErrors(null);
        this.contactMeForm.controls.from_message.setErrors(null);
      } else {
      }
    });
  }
}
