import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  selectedTab = 0;
  tabs: any[] = [];
  isMobile = false;

  constructor(private translate: TranslateService) {
    this.loadTabs();
    this.translate.onLangChange.subscribe(() => this.loadTabs());
  }

  ngOnInit(): void {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkViewport();
  }

  checkViewport(): void {
    this.isMobile = window.innerWidth <= 768;
    console.log('isMobile:', this.isMobile);
  }

  loadTabs() {
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
          live: 'https://deine-el-pollo-live-url.com',
          github: 'https://github.com/dein-projekt/el-pollo-loco',
          points: translations['PROJECTS.EL_POLLO'].POINTS.map((p: any) => ({
            title: p.TITLE,
            duration: p.DURATION,
            text: p.TEXT
          }))
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
          live: 'https://dein-join-live-url.com',
          github: 'https://github.com/dein-projekt/join',
          points: translations['PROJECTS.JOIN'].POINTS.map((p: any) => ({
            title: p.TITLE,
            duration: p.DURATION,
            text: p.TEXT
          }))
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
          live: '#',
          github: '#',
          points: translations['PROJECTS.DA_BUBBLE'].POINTS.map((p: any) => ({
            title: p.TITLE,
            duration: p.DURATION,
            text: p.TEXT
          }))
        }
      ];
    });
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
