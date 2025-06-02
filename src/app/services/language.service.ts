import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private langSubject: BehaviorSubject<string>;
  public lang$: Observable<string>;

  constructor() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.langSubject = new BehaviorSubject<string>(savedLang);
    this.lang$ = this.langSubject.asObservable();
  }

  /**
   * Sets the current language and stores it in localStorage
   * @param lang Language code (e.g., 'en' or 'de')
   */
  setLanguage(lang: string): void {
    localStorage.setItem('selectedLanguage', lang);
    this.langSubject.next(lang);
  }

  /**
   * Returns the currently active language code
   */
  getCurrentLanguage(): string {
    return this.langSubject.value;
  }
}
