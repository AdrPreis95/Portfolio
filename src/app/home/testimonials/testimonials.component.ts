import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  testimonials: any[] = [];

  constructor(private translate: TranslateService) {
    this.loadTranslations();

    // 🔁 Reagiert auf Sprachwechsel (z.B. durch dein Toggle)
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTranslations();
    });
  }

  loadTranslations() {
    this.translate.get('TESTIMONIALS').subscribe((t: any) => {
      this.testimonials = [
        {
          name: 'Sahra Mueller',
          project: 'DA Bubble',
          quote: t.LIST[0],
          link: '#'
        },
        {
          name: 'James Rugman',
          project: 'Join',
          quote: t.LIST[1],
          link: '#'
        },
        {
          name: 'Evelyn Marx',
          project: 'Sharkie',
          quote: t.LIST[2],
          link: '#'
        }
      ];
    });
  }
}
