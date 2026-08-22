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
    { name: 'Angular', icon: this.icon('Angular.svg') },
    { name: 'TypeScript', icon: this.icon('TypeScript.svg') },
    { name: 'JavaScript', icon: this.icon('JavaScript.svg') },
    { name: 'HTML', icon: this.icon('HTML.svg') },
    { name: 'CSS', icon: this.icon('CSS.svg') },
    { name: 'Python', icon: this.icon('Python.svg') },
    { name: 'Django', icon: this.icon('Django.svg') },
    { name: 'DRF', icon: this.icon('DRF.svg') },
    { name: 'Rest-Api', icon: this.icon('RestApi.svg') },
    { name: 'SQL', icon: this.icon('SQL.svg') },
    { name: 'PostgreSQL', icon: this.icon('PostgreSQL.svg') },
    { name: 'GIT', icon: this.icon('GIT.svg') },
    { name: 'Docker', icon: this.icon('Docker.svg') },
    { name: 'Linux', icon: this.icon('Linux.svg') },
    { name: 'Firebase', icon: this.icon('Firebase.svg') }
  ];

  /**
   * Technologies the user is currently learning.
   */
  learning = [
    { name: 'React', icon: this.icon('React.svg') },
    { name: 'Vue Js', icon: this.icon('VueJs.svg') }
  ];

  private icon(file: string): string {
    return '/assets/skills/icons/' + file + '?v=2';
  }

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

  scrollToContact(): void {
    this.scrollToSection('contact');
  }

  private scrollToSection(id: string): void {
    const section = document.getElementById(id);
    if (!section) return;

    const isMobile = window.innerWidth <= 660;

    const offsets: { [key: string]: number } = {
      contact: -60,
      whyme: 60,
      skills: 60,
      projects: 70,
      'default': 100
    };

    const offset = offsets[id] ?? offsets['default'];
    const top = section.getBoundingClientRect().top + window.scrollY - offset;

    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({ top, behavior: 'smooth' });
      }, 300); 
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

}
