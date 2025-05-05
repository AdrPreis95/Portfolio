import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.checkViewport(); // Falls jemand auf Desktop lädt
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkViewport(); // Bei jeder Größenänderung prüfen
  }

  private checkViewport(): void {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop && this.isMenuOpen) {
      this.closeMenu(); // Menü schließen bei Desktop
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
