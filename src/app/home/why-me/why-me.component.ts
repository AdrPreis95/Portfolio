import { Component } from '@angular/core';

@Component({
  selector: 'app-why-me',
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss'
})
export class WhyMeComponent {

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
