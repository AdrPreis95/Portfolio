import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Represents the hero section at the top of the homepage.
 * Handles responsive behavior, language switching,
 * and menu state tracking.
 */
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  /**
   * Indicates whether the current viewport is mobile-sized.
   */
  isMobile = false;

  /**
   * Reflects whether the mobile menu is currently open.
   */
  menuOpen = false;

  /**
   * Indicates whether the code is executing in the browser (vs server-side).
   */
  isBrowser: boolean;

  /**
   * Currently active language code (e.g., 'en' or 'de').
   */
  currentLanguage = 'en';

  /**
   * Constructs the HeroComponent.
   * @param platformId Used to determine if the code runs in the browser.
   * @param menuService Shared service for menu state communication.
   * @param translate Translation service for language switching.
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private menuService: MenuService,
    private translate: TranslateService 
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.translate.setDefaultLang('en');
    this.currentLanguage = this.translate.currentLang || 'en';
  }

  /**
   * Angular lifecycle hook that initializes the component.
   * Sets viewport state and subscribes to menu state changes.
   */
  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkViewport();

      this.menuService.menuOpen$.subscribe((state) => {
        this.menuOpen = state;
      });
    }
  }

  /**
   * Switches the UI language.
   * @param lang The new language code to use.
   */
  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguage = lang;
  }

  /**
   * Closes the mobile menu via the MenuService.
   */
  closeMenu(): void {
    this.menuService.setMenuOpen(false);
  }

  /**
   * Triggered on window resize; updates the viewport state.
   */
  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  /**
   * Checks whether the current viewport is considered mobile.
   */
  checkViewport(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  /**
   * Smoothly scrolls the view to the #whyme section.
   */
  scrollToWhyMe(): void {
    if (this.isBrowser) {
      const element = document.getElementById('whyme');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
