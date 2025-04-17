import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  showConfirmation = false;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      privacy: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    this.submitted = true;
  
   
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  
    if (this.contactForm.valid && !this.showConfirmation) {
      const data = this.contactForm.value;
  
      fetch('https://formspree.io/f/xvgkdaon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message
        })
      }).then(() => {
        this.showConfirmation = true;
        this.contactForm.reset();
        this.submitted = false;
  
        setTimeout(() => {
          this.closeConfirmation();
        }, 5000);
      });
    }
  }
  
  
  
  closeConfirmation() {
    this.showConfirmation = false;
    this.submitted = false;
  }
  
}

