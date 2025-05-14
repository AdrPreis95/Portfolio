import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Displays a set of portfolio projects with dynamic content
 * based on the selected language. Supports responsive behavior
 * and external links to live demos and GitHub repositories.
 */
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  /**
   * Index of the currently selected project tab.
   */
  selectedTab = 0;

  /**
   * Array containing translated tab/project data.
   */
  tabs: any[] = [];

  /**
   * Indicates whether the current view is mobile.
   */
  isMobile = false;

  /**
   * Indicates whether the code is executing in the browser.
   */
  isBrowser: boolean;

  /**
   * Constructs the ProjectsComponent.
   * @param translate Service for dynamic translation handling.
   * @param platformId Used to determine the platform (browser/server).
   */
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadTabs();
    this.translate.onLangChange.subscribe(() => this.loadTabs());
  }

  /**
   * Angular lifecycle hook that runs after component initialization.
   * Checks the current viewport.
   */
  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  /**
   * Updates mobile state on window resize.
   */
  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  /**
   * Determines whether the current view is considered mobile.
   */
  checkViewport(): void {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  /**
   * Opens a given URL in a new browser tab if it's valid.
   * @param url The URL to open (live demo).
   */
  openLiveDemo(url: string): void {
    if (this.isBrowser && url && url !== '#') {
      window.open(url, '_blank');
    }
  }

  /**
   * Loads the translated project data and prepares the tabs.
   * Triggered on component load and language change.
   */
  loadTabs(): void {
    this.translate.get([
      'PROJECTS.EL_POLLO',
      'PROJECTS.JOIN',
      'PROJECTS.DA_BUBBLE'
    ]).subscribe(translations => {
      this.tabs = [
        {
          label: '1. ' + translations['PROJECTS.EL_POLLO'].LABEL,
          screenshot: '/assets/projects/img/ElPolloLoco.svg',
          technologies: [
            'assets/skills/icons/JavaScript.svg',
            'assets/skills/icons/CSS.svg',
            'assets/skills/icons/HTML.svg',
            'assets/skills/icons/GIT.svg'
          ],
          live: 'https://adrian-preis.de/ElPolloLoco',
          github: 'https://github.com/AdrPreis95/2d-Game-Pollo-Loco',
          points: translations['PROJECTS.EL_POLLO'].POINTS?.map((p: any) => ({
            title: p.TITLE,
            duration: p.DURATION,
            text: p.TEXT
          })) || []
        },
        {
          label: '2. ' + translations['PROJECTS.JOIN'].LABEL,
          screenshot: '/assets/projects/img/Join.svg',
          technologies: [
            'assets/skills/icons/JavaScript.svg',
            'assets/skills/icons/CSS.svg',
            'assets/skills/icons/HTML.svg',
            'assets/skills/icons/GIT.svg',
            'assets/projects/icons/Firebase.svg'
          ],
          live: 'https://adrian-preis.de/join',
          github: 'https://github.com/AdrPreis95/Join-376',
          points: translations['PROJECTS.JOIN'].POINTS?.map((p: any) => ({
            title: p.TITLE,
            duration: p.DURATION,
            text: p.TEXT
          })) || []
        },
        {
          label: '3. ' + translations['PROJECTS.DA_BUBBLE'].LABEL,
          screenshot: '/assets/projects/img/DaBubble.svg',
          technologies: [
            'assets/skills/icons/JavaScript.svg',
            'assets/skills/icons/CSS.svg',
            'assets/skills/icons/HTML.svg',
            'assets/skills/icons/GIT.svg',
            'assets/projects/icons/Firebase.svg'
          ],
          points: translations['PROJECTS.DA_BUBBLE'].POINTS?.map((p: any) => ({
            title: p.TITLE,
            duration: p.DURATION,
            text: p.TEXT
          })) || []
        }
      ];
    });
  }

  /**
   * Selects a specific project tab based on index.
   * @param index The tab index to activate.
   */
  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
