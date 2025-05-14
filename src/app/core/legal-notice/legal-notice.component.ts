import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Displays the legal notice (Impressum) page.
 * Provides functionality to navigate back to the home page.
 */
@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent {
  /**
   * Constructs the LegalNoticeComponent.
   * @param router Angular Router used for navigation.
   */
  constructor(private router: Router) {}

  /**
   * Closes the legal notice view and navigates to the home route.
   */
  close(): void {
    this.router.navigate(['/']);
  }
}
