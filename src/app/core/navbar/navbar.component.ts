import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';



/**
 * Represents the navigation bar component.
 * Handles mobile menu state, language switching, and responsive behavior.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  /**
   * Indicates whether the mobile menu is currently open.
   */
  isMenuOpen = false;

  /**
   * Stores the currently selected language (default: 'en').
   */
  currentLanguage = 'en';

  /**
   * Indicates whether the code is running in a browser (as opposed to server-side).
   */
  private isBrowser: boolean;

  /**
   * Constructs the NavbarComponent.
   * @param translate Service used for handling translations.
   * @param platformId Injected platform ID to determine execution context (browser vs server).
   * @param menuService Shared service for communicating menu state.
   */
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private menuService: MenuService,
    private languageService: LanguageService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Lifecycle hook called after component initialization.
   * Checks the viewport on load.
   */
  ngOnInit(): void {
    if (this.isBrowser) {
      const lang = this.languageService.getCurrentLanguage();
      this.translate.use(lang);
      this.currentLanguage = lang;

      this.menuService.menuOpen$.subscribe((state) => {
        this.isMenuOpen = state;
      });


      this.checkViewport();
    }
  }



  /**
   * Handles window resize events to close the mobile menu on desktop view.
   */
  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  /**
   * Checks the viewport width and closes the mobile menu if in desktop view.
   * Triggered on initialization and window resize.
   */
  private checkViewport(): void {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  /**
   * Switches the application language.
   * @param lang Language code to switch to (e.g., 'en' or 'de').
   */
  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.translate.use(lang);
    this.currentLanguage = lang;
  }



  /**
   * Toggles the mobile menu open or closed, and updates shared menu state.
   */
  toggleMobileMenu(): void {
    if (this.isMenuOpen) {
      this.menuService.setMenuOpen(false);

      setTimeout(() => {
        this.isMenuOpen = false;
      }, 500);
    } else {
      this.isMenuOpen = true;
      this.menuService.setMenuOpen(true);
    }
  }

  /**
   * Closes the mobile menu and updates shared menu state.
   */
  closeMenu(): void {
    this.isMenuOpen = false;
    this.menuService.setMenuOpen(false);
  }

  get isLegalPage(): boolean {
    return this.router.url.includes('legal-notice') || this.router.url.includes('privacy-policy');
  }

}
