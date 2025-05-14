import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * A shared service for managing the mobile menu state across components.
 * Uses RxJS BehaviorSubject to provide observable state updates.
 *
 *  Context:
 * This service was introduced to coordinate the menu state between the 
 * NavbarComponent and the HeroComponent, where the mobile version of the 
 * navigation is embedded directly into the Hero for clarity and maintainability.
 * 
 *  Why?
 * To avoid unnecessary complexity, reduce coupling, and keep the DOM structure
 * predictable – especially on mobile – the mobile navbar is implemented directly
 * inside the HeroComponent rather than reusing the standard NavbarComponent markup.
 */
@Injectable({ providedIn: 'root' })
export class MenuService {
  /**
   * Internal subject holding the current menu open state.
   */
  private menuOpenSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable that emits changes to the menu open state.
   */
  menuOpen$ = this.menuOpenSubject.asObservable();

  /**
   * Updates the current menu open state.
   * @param state True if the menu should be open, false otherwise.
   */
  setMenuOpen(state: boolean): void {
    this.menuOpenSubject.next(state);
  }
}
