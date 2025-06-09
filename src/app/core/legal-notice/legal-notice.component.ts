import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

/**
 * Displays the legal notice (Impressum) page.
 * Provides functionality to navigate back to the home page.
 * Also handles mobile-friendly accordion behavior.
 */
@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent implements OnInit {
  openedSectionIndex: number | null = null;
  isMobile = false;

  /**
   * Legal notice sections with translation keys.
   */
  legalSections = [
    { title: 'LEGAL.NAME', content: 'LEGAL.NAME_TEXT' },
    { title: 'LEGAL.ADDRESS', content: 'LEGAL.ADDRESS_TEXT' },
    { title: 'LEGAL.CONTACT', content: 'LEGAL.CONTACT_TEXT' },
    { title: 'LEGAL.PHONE', content: 'LEGAL.PHONE_TEXT' },
    { title: 'LEGAL.RESPONSIBLE', content: 'LEGAL.RESPONSIBLE_TEXT' },
    { title: 'LEGAL.DISCLAIMER', content: 'LEGAL.DISCLAIMER_TEXT' },
    { title: 'LEGAL.SOURCE_NOTE', content: 'LEGAL.SOURCE_TEXT' },
    { title: 'LEGAL.NO_ABMAHNUNG', content: 'LEGAL.NO_ABMAHNUNG_TEXT' }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private viewportScroller: ViewportScroller
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  /**
   * Handles responsive behavior on resize.
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
   * Toggles visibility of a section in mobile accordion view.
   * @param index Index of the section to toggle.
   */
  toggleSection(index: number): void {
    this.openedSectionIndex = this.openedSectionIndex === index ? null : index;
  }

  /**
   * Checks if a section is currently open.
   * Always open on desktop; toggleable on mobile.
   * @param index Index of the section.
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
