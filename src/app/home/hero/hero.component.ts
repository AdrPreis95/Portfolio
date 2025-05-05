import { Component, HostListener, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  isMobile = false;
  @Input() menuOpen: boolean = false;

  ngOnInit() {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobile = window.innerWidth <= 768;
  }

  scrollToWhyMe(): void {
    const element = document.getElementById('whyme');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
