import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio-classic';
  isLegalPage = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false
      });

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const legalRoutes = ['/legal-notice', '/privacy-policy'];
          this.isLegalPage = legalRoutes.includes(event.urlAfterRedirects);
          setTimeout(() => AOS.refresh(), 300);
        }
      });
    }
  }
}
