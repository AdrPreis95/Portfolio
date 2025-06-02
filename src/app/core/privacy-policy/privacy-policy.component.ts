import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  openedSectionIndex: number | null = null;
  isMobile = false;

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


  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.openedSectionIndex = null; 
      }
    }
  }

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
    }
  }

  toggleSection(index: number): void {
    this.openedSectionIndex = this.openedSectionIndex === index ? null : index;
  }

  isSectionOpen(index: number): boolean {
    return !this.isMobile || this.openedSectionIndex === index;
  }

  close(): void {
    this.router.navigate(['/']);
  }
}

