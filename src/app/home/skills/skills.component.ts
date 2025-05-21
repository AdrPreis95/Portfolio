import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Displays the user's technical skills and currently learned technologies.
 * Handles responsive layout based on viewport size.
 */
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  /**
   * Indicates whether the current viewport is considered mobile.
   */
  isMobile = false;

  /**
   * Indicates whether the code is running in the browser environment.
   */
  isBrowser: boolean;

  /**
   * Main technical skills with associated icons.
   */
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

  /**
   * Technologies the user is currently learning.
   */
  learning = [
    { name: 'React', icon: '/assets/skills/icons/React.svg' },
    { name: 'Vue Js', icon: '/assets/skills/icons/VueJs.svg' }
  ];

  /**
   * Constructs the SkillsComponent and detects platform type.
   * @param platformId Used to determine if code runs in browser or on server.
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Angular lifecycle hook called after component initialization.
   * Triggers viewport detection.
   */
  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  /**
   * Host listener for window resize events.
   * Updates the responsive state.
   */
  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  /**
   * Determines whether the viewport is mobile-sized.
   */
  checkViewport(): void {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth <= 768;
    }
  }
  
  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
