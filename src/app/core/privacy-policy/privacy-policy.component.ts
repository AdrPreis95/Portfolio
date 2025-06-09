import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HostListener } from '@angular/core';

/**
 * Displays the privacy policy page.
 * Provides functionality to navigate back to the home page.
 * Handles responsive accordion behavior for mobile devices.
 */
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  openedSectionIndex: number | null = null;
  isMobile = false;

  /**
   * Privacy policy sections with translation keys.
   */
  privacySections = [
    { title: 'PRIVACY.INTRO_TITLE', content: 'PRIVACY.INTRO_TEXT' },
    { title: 'PRIVACY.HOSTING_TITLE', content: 'PRIVACY.HOSTING_TEXT' },
    { title: 'PRIVACY.LOGFILES_TITLE', content: 'PRIVACY.LOGFILES_TEXT' },
    { title: 'PRIVACY.CONTACT_FORM_TITLE', content: 'PRIVACY.CONTACT_FORM_TEXT' },
    { title: 'PRIVACY.DATA_USAGE_TITLE', content: 'PRIVACY.DATA_USAGE_TEXT' },
    { title: 'PRIVACY.COOKIES_TITLE', content: 'PRIVACY.COOKIES_TEXT' },
    { title: 'PRIVACY.ANALYTICS_TITLE', content: 'PRIVACY.ANALYTICS_TEXT' },
    { title: 'PRIVACY.RIGHTS_TITLE', content: 'PRIVACY.RIGHTS_TEXT' },
    { title: 'PRIVACY.CONTACT_TITLE', content: 'PRIVACY.CONTACT_TEXT' }
  ];

  /**
   * Handles responsive behavior on window resize.
   * Updates mobile mode and resets opened section index on desktop.
   */
  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.openedSectionIndex = null;
      }
    }
  }

  /**
   * Initializes the component.
   * Scrolls to the top of the page to ensure the heading is visible.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  /**
   * Constructor to initialize dependencies and detect mobile mode.
   * @param router Angular router for navigation.
   * @param platformId Platform ID for browser detection.
   * @param viewportScroller ViewportScroller to scroll the window programmatically.
   */
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private viewportScroller: ViewportScroller
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
    }
  }

  /**
   * Toggles the visibility of a section in the mobile accordion.
   * @param index Index of the section to toggle.
   */
  toggleSection(index: number): void {
    this.openedSectionIndex = this.openedSectionIndex === index ? null : index;
  }

  /**
   * Checks whether a section should be displayed as open.
   * Always returns true on desktop.
   * @param index Index of the section.
   * @returns True if the section is open or if on desktop, otherwise false.
   */
  isSectionOpen(index: number): boolean {
    return !this.isMobile || this.openedSectionIndex === index;
  }

  /**
   * Navigates back to the homepage.
   */
  close(): void {
    this.router.navigate(['/']);
  }
}
