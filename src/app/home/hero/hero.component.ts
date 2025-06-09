import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

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
   * handles the close animation for mobile navbar (smooth after clicking on link).
   */
  isClosingMenu = false;

  /**
   * Constructs the HeroComponent.
   * @param platformId Used to determine if the code runs in the browser.
   * @param menuService Shared service for menu state communication.
   * @param translate Translation service for language switching.
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private menuService: MenuService,
    private translate: TranslateService,
    private languageService: LanguageService
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

      this.currentLanguage = this.languageService.getCurrentLanguage();
      this.translate.use(this.currentLanguage);
      this.languageService.lang$.subscribe((lang) => {
        this.currentLanguage = lang;
        this.translate.use(lang);
      });
    }
  }

  /**
   * Switches the UI language.
   * @param lang The new language code to use.
   */
  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.translate.use(lang);
    this.currentLanguage = lang;
  }


  /**
   * Closes the mobile menu via the MenuService.
   */
  closeMenu(): void {
    this.isClosingMenu = true;

    setTimeout(() => {
      this.menuService.setMenuOpen(false);
      this.menuOpen = false;
      this.isClosingMenu = false;
    }, 500);
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
    this.isMobile = window.innerWidth <= 660;
  }

  /**
  * Smoothly scrolls the view to the Navbar sections.
  */
  scrollToContact(): void {
    this.scrollToSection('contact');
  }

 scrollToWhyMe(): void {
  if (typeof window === 'undefined') return;

  const isMobile = window.innerWidth <= 660;
  const targetId = 'whyme-heading';
  const target = document.getElementById(targetId);
  if (!target) return;

  let offset = 120;

  if (isMobile) {
    offset = 0; 
  } else {
    const isAtTop = window.scrollY < 100;
    offset = isAtTop ? 180 : 120;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: 'smooth'
  });
}


  scrollToSkills(): void {
    this.scrollToSection('skills');
  }

  scrollToProjects(): void {
    this.scrollToSection('projects');
  }


  private scrollToSection(id: string): void {
    if (!this.isBrowser) return;

    const isMobile = window.innerWidth <= 660;

    const scroll = () => {
      const heading = document.getElementById(`${id}-heading`);
      if (!heading) return;

      const top = heading.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    };

    if (isMobile) {
      this.isClosingMenu = true;

      setTimeout(() => {
        this.menuOpen = false;
        this.menuService.setMenuOpen(false);
        this.isClosingMenu = false;
        setTimeout(scroll, 50);
      }, 600);
    } else {
      scroll();
    }
  }




}