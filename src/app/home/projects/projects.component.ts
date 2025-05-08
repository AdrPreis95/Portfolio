import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  selectedTab = 0;
  tabs: any[] = [];
  isMobile = false;
  isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadTabs();
    this.translate.onLangChange.subscribe(() => this.loadTabs());
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
      console.log('isMobile:', this.isMobile);
    }
  }

  openLiveDemo(url: string): void {
    if (this.isBrowser && url && url !== '#') {
      window.open(url, '_blank');
    }
  }

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

  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
