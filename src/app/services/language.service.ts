import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private langSubject: BehaviorSubject<string>;
  public lang$: Observable<string>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    let savedLang = 'en';
    if (this.isBrowser) {
      const stored = localStorage.getItem('selectedLanguage');
      if (stored) savedLang = stored;
    }

    this.langSubject = new BehaviorSubject<string>(savedLang);
    this.lang$ = this.langSubject.asObservable();
  }

  setLanguage(lang: string): void {
    if (this.isBrowser) {
      localStorage.setItem('selectedLanguage', lang);
    }
    this.langSubject.next(lang);
  }

  getCurrentLanguage(): string {
    return this.langSubject.value;
  }
}
