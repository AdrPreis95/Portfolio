import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Represents the contact form component.
 * Handles user input, validation, spam protection,
 * and form submission via PHP backend.
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  /**
   * Reactive form group for the contact form.
   */
  contactForm: FormGroup;

  /**
   * Indicates whether the confirmation message is shown.
   */
  showConfirmation = false;

  /**
   * Indicates whether the form has been submitted.
   */
  submitted = false;

  /**
   * Remaining characters allowed in the message field.
   */
  remainingChars = 500;

  /**
   * Constructs the contact form component and initializes the form controls.
   * @param fb Angular FormBuilder used to create the form.
   */
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^(?!\.)(?!.*\.\.)[a-zA-Z0-9._%+-]+(?<!\.)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      message: ['', Validators.required],
      privacy: [false, Validators.requiredTrue],
      honeypot: ['']
    });
  }

  /**
   * Lifecycle hook for component initialization.
   * Subscribes to message input changes to update character count.
   */
  ngOnInit(): void {
    this.contactForm.get('message')?.valueChanges.subscribe(() => {
      this.updateRemainingChars();
    });

    this.updateRemainingChars();
  }

  /**
   * Updates the number of remaining characters in the message field.
   */
  updateRemainingChars(): void {
    const currentLength = this.contactForm.get('message')?.value?.length || 0;
    this.remainingChars = 500 - currentLength;
  }

  /**
   * Handles the actual form submission if valid and not marked as spam.
   * Sends data to a PHP backend and shows confirmation on success.
   */
  onSubmit(): void {
    if (this.contactForm.get('honeypot')?.value) {
      console.warn('Spam detected, message ignored!');
      return;
    }
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
        console.error('Error while sending message:', error);
      });
    }
  }

  /**
   * Triggers form submission logic after validating all fields.
   */
  handleSubmitClick(): void {
    this.submitted = true;

    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.contactForm.valid) {
      this.onSubmit();
    }
  }

  /**
   * Closes the confirmation message and resets submission state.
   */
  closeConfirmation(): void {
    this.showConfirmation = false;
    this.submitted = false;
  }

  /**
   * Scrolls to the Hero Section
   */
  scrollToHero() {
    const section = document.getElementById('hero');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
