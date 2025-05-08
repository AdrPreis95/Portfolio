import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  isMobile = false;
  isBrowser: boolean;

  mainSkills = [
    { name: 'Angular', icon: '/assets/skills/icons/Angular.svg' },
    { name: 'TypeScript', icon: '/assets/skills/icons/TypeScript.svg' },
    { name: 'JavaScript', icon: '/assets/skills/icons/JavaScript.svg' },
    { name: 'HTML', icon: '/assets/skills/icons/HTML.svg' },
    { name: 'CSS', icon: '/assets/skills/icons/CSS.svg' },
    { name: 'Rest-Api', icon: '/assets/skills/icons/RestApi.svg' },
    { name: 'Firebase', icon: '/assets/skills/icons/Firebase.svg' },
    { name: 'GIT', icon: '/assets/skills/icons/GIT.svg' },
    { name: 'Material Design', icon: '/assets/skills/icons/MaterialDesign.svg' },
    { name: 'Scrum', icon: '/assets/skills/icons/Scrum.svg' }
  ];

  learning = [
    { name: 'React', icon: '/assets/skills/icons/React.svg' },
    { name: 'Vue Js', icon: '/assets/skills/icons/VueJs.svg' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  checkViewport(): void {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth <= 768;
    }
  }
}
