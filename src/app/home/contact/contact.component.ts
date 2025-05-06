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
  remainingChars = 500;

ngOnInit(): void {
  this.contactForm.get('message')?.valueChanges.subscribe(() => {
    this.updateRemainingChars();
  });

  this.updateRemainingChars(); // Initial setzen
}

updateRemainingChars() {
  const currentLength = this.contactForm.get('message')?.value?.length || 0;
  this.remainingChars = 500 - currentLength;
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

  handleSubmitClick() {
    this.submitted = true;
  
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  
    // Wenn das Formular valide ist, führe die eigentliche Logik aus
    if (this.contactForm.valid) {
      this.onSubmit();
    }
  }
  

  closeConfirmation() {
    this.showConfirmation = false;
    this.submitted = false;
  }

}

