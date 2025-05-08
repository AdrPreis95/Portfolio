import { Component, HostListener, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  isMobile = false;
  @Input() menuOpen: boolean = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  checkViewport() {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth <= 768;
    }
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
