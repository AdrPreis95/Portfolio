import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  isMobile = false;
  menuOpen = false;
  isBrowser: boolean;
  currentLanguage = 'en';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private menuService: MenuService,
    private translate: TranslateService 
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.translate.setDefaultLang('en');
    this.currentLanguage = this.translate.currentLang || 'en';
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkViewport();

      this.menuService.menuOpen$.subscribe((state) => {
        this.menuOpen = state;
      });
    }
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguage = lang;
  }

  closeMenu(): void {
    this.menuService.setMenuOpen(false);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  checkViewport(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  scrollToWhyMe(): void {
    if (this.isBrowser) {
      const element = document.getElementById('whyme');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
