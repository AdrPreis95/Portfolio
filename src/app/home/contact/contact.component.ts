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

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);

      fetch('send.php', {
        method: 'POST',
        body: formData
      }).then(() => {
        this.showConfirmation = true;
        this.contactForm.reset();
        this.submitted = false;

        setTimeout(() => {
          this.closeConfirmation();
        }, 5000);
      }).catch(error => {
        console.error('Fehler beim Senden der Nachricht:', error);
      });
    }


  }



  closeConfirmation() {
    this.showConfirmation = false;
    this.submitted = false;
  }

}

