import { Component } from '@angular/core';

/**
 * Represents the "Why Me" section of the portfolio.
 * Contains logic to scroll smoothly to the contact section.
 */
@Component({
  selector: 'app-why-me',
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss'
})
export class WhyMeComponent {

  /**
   * Smoothly scrolls the view to the contact section.
   */
  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
