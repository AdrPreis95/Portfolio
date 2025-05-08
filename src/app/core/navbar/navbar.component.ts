import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  currentLanguage = 'en';
  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    translate.setDefaultLang('en');
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkViewport(); // Falls jemand auf Desktop lädt
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkViewport(); // Bei jeder Größenänderung prüfen
    }
  }

  private checkViewport(): void {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguage = lang;
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
