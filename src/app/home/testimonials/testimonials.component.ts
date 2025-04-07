import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})

export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Sahra Mueller',
      project: 'DA Bubble',
      quote: 'Claudia had to develop, format and deliver content in collaboration with the team members. She is a reliable and friendly person.',
      link: '#'
    },
    {
      name: 'James Rugman',
      project: 'Join',
      quote: 'Claudia is a reliable and friendly person. Works in a structured way and writes clear code. I recommend her as a colleague.',
      link: '#'
    },
    {
      name: 'Evelyn Marx',
      project: 'Sharkie',
      quote: 'She is a trustworthy teamplayer and can cope with the stress of deadlines. Structured work and clear code.',
      link: '#'
    }
  ];
}

