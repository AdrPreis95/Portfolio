import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

/**
 * Displays a list of testimonials (team feedback) for selected projects.
 * Reacts to language changes and updates the content dynamically.
 */
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  /**
   * Array of translated testimonial entries.
   */
  testimonials: any[] = [];

  /**
   * Constructs the TestimonialsComponent.
   * Initializes testimonials based on current language
   * and listens for language change events.
   * 
   * @param translate Translation service used for fetching localized content.
   */
  constructor(private translate: TranslateService) {
    this.loadTranslations();

    //  Reacts to language changes triggered by the toggle
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTranslations();
    });
  }

  /**
   * Loads the translated testimonial texts into the component.
   */
  loadTranslations(): void {
    this.translate.get('TESTIMONIALS').subscribe((t: any) => {
      this.testimonials = [
        {
          name: 'Henrik',
          project: 'Join',
          quote: t.LIST[0],
          link: '#'
        },
        {
          name: 'Jonas',
          project: 'Join',
          quote: t.LIST[1],
          link: '#'
        },
        {
          name: 'Nico',
          project: 'Join',
          quote: t.LIST[2],
          link: '#'
        }
      ];
    });
  }
}
