import { Component, HostListener, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

interface GallerySlide {
  src: string;
  title: string;
  text: string;
  broken?: boolean;
}

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
export class ProjectsComponent implements OnInit, OnDestroy {
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
   * Whether the screenshot walkthrough overlay is open.
   */
  galleryOpen = false;

  /**
   * Index of the visible gallery slide.
   */
  galleryIndex = 0;

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

  ngOnDestroy(): void {
    this.unlockScroll();
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
   * Keyboard controls for the walkthrough overlay.
   */
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.galleryOpen) {
      return;
    }
    if (event.key === 'Escape') {
      this.closeGallery();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      this.prevSlide();
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

  get currentGallery(): GallerySlide[] {
    const slides = this.tabs[this.selectedTab]?.gallery as GallerySlide[] | undefined;
    return (slides || []).filter(slide => !slide.broken);
  }

  get currentSlide(): GallerySlide | null {
    return this.currentGallery[this.galleryIndex] || this.currentGallery[0] || null;
  }

  /**
   * Loads the translated project data and prepares the tabs.
   * Triggered on component load and language change.
   */
  loadTabs(): void {
    this.translate.get([
      'PROJECTS.EL_POLLO',
      'PROJECTS.JOIN',
      'PROJECTS.ZUSTELLER',
      'PROJECTS.PORTFOLIO'
    ]).subscribe(translations => {
      this.tabs = [
        {
          label: '1. ' + translations['PROJECTS.JOIN'].LABEL,
          screenshot: '/assets/projects/img/JoinDjango.png',
          technologies: [
            this.tech('Angular', 'Angular.svg'),
            this.tech('TypeScript', 'TypeScript.svg'),
            this.tech('Django', 'Django.svg'),
            this.tech('Python', 'Python.svg'),
            this.tech('DRF', 'DRF.svg'),
            this.tech('Rest-Api', 'RestApi.svg'),
            this.tech('SQL', 'SQL.svg')
          ],
          live: 'http://167.233.146.186:8080',
          github: 'https://github.com/AdrPreis95/Join-Django',
          points: this.mapPoints(translations['PROJECTS.JOIN']),
          gallery: this.mapGallery(translations['PROJECTS.JOIN'])
        },
        {
          label: '2. ' + translations['PROJECTS.ZUSTELLER'].LABEL,
          screenshot: '/assets/projects/img/Zusteller.png',
          technologies: [
            this.tech('Angular', 'Angular.svg'),
            this.tech('TypeScript', 'TypeScript.svg'),
            this.tech('Django', 'Django.svg'),
            this.tech('Python', 'Python.svg'),
            this.tech('DRF', 'DRF.svg'),
            this.tech('Rest-Api', 'RestApi.svg'),
            this.tech('SQL', 'SQL.svg')
          ],
          points: this.mapPoints(translations['PROJECTS.ZUSTELLER']),
          gallery: this.mapGallery(translations['PROJECTS.ZUSTELLER'])
        },
        {
          label: '3. ' + translations['PROJECTS.EL_POLLO'].LABEL,
          screenshot: '/assets/projects/img/ElPolloLoco.png',
          technologies: [
            this.tech('JavaScript', 'JavaScript.svg'),
            this.tech('HTML', 'HTML.svg'),
            this.tech('CSS', 'CSS.svg'),
            this.tech('GIT', 'GIT.svg')
          ],
          live: 'http://167.233.146.186/ElPolloLoco/',
          github: 'https://github.com/AdrPreis95/2d-Game-Pollo-Loco',
          points: this.mapPoints(translations['PROJECTS.EL_POLLO']),
          gallery: this.mapGallery(translations['PROJECTS.EL_POLLO'])
        },
        {
          label: '4. ' + translations['PROJECTS.PORTFOLIO'].LABEL,
          screenshot: '/assets/projects/img/Portfolio.png',
          technologies: [
            this.tech('Angular', 'Angular.svg'),
            this.tech('TypeScript', 'TypeScript.svg'),
            this.tech('HTML', 'HTML.svg'),
            this.tech('CSS', 'CSS.svg'),
            this.tech('GIT', 'GIT.svg')
          ],
          live: 'http://167.233.146.186',
          github: 'https://github.com/AdrPreis95/Portfolio',
          points: this.mapPoints(translations['PROJECTS.PORTFOLIO']),
          gallery: this.mapGallery(translations['PROJECTS.PORTFOLIO'])
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
    this.closeGallery();
  }

  openGallery(): void {
    if (!this.currentGallery.length) {
      return;
    }
    this.galleryIndex = 0;
    this.galleryOpen = true;
    this.lockScroll();
  }

  closeGallery(): void {
    this.galleryOpen = false;
    this.unlockScroll();
  }

  nextSlide(): void {
    if (this.currentGallery.length < 2) {
      return;
    }
    this.galleryIndex = (this.galleryIndex + 1) % this.currentGallery.length;
  }

  prevSlide(): void {
    if (this.currentGallery.length < 2) {
      return;
    }
    this.galleryIndex =
      (this.galleryIndex - 1 + this.currentGallery.length) % this.currentGallery.length;
  }

  markBroken(slide: GallerySlide): void {
    slide.broken = true;
    if (this.galleryIndex >= this.currentGallery.length) {
      this.galleryIndex = Math.max(0, this.currentGallery.length - 1);
    }
    if (!this.currentGallery.length) {
      this.closeGallery();
    }
  }

  private mapPoints(block: any): { title: string; duration?: string; text: string }[] {
    return block.POINTS?.map((p: any) => ({
      title: p.TITLE,
      duration: p.DURATION,
      text: p.TEXT
    })) || [];
  }

  private mapGallery(block: any): GallerySlide[] {
    return block.GALLERY?.map((item: any) => ({
      src: item.IMAGE,
      title: item.TITLE,
      text: item.TEXT,
      broken: false
    })) || [];
  }

  private tech(name: string, file: string) {
    return {
      name,
      icon: 'assets/skills/icons/' + file
    };
  }

  private lockScroll(): void {
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  private unlockScroll(): void {
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }
}
