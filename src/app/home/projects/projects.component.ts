import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {
  selectedTab = 0;

  tabs = [
    {
      label: '1. DA Bubble',
      screenshot: 'assets/projects/da-bubble/screenshot.png',
      technologies: [
        'assets/projects/da-bubble/technologies/angular.svg',
        'assets/projects/da-bubble/technologies/typescript.svg',
        'assets/projects/da-bubble/technologies/firebase.svg'
      ],
      live: '#',
      github: '#',
      points: [
        {
          title: 'About the project',
          duration: 'Duration: 3 weeks',
          text: 'This App is a Slack Clone App. It revolutionizes team communication...'
        },
        {
          title: 'How I have organised my work process',
          text: 'How do you keep your code clean and maintainable?...'
        },
        {
          title: 'My group work experience',
          text: 'How many people were in the team and what was your role?...'
        }
      ]
    },
    {
      label: '2. El Pollo Loco',
      screenshot: '/assets/projects/img/ElPolloLoco.svg',
      technologies: [
        'assets/skills/icons/JavaScript.svg',
        'assets/skills/icons/CSS.svg',
        'assets/skills/icons/HTML.svg'
      ],
      live: 'https://deine-el-pollo-live-url.com',
      github: 'https://github.com/dein-projekt/el-pollo-loco',
      points: [
        {
          title: 'About the project',
          duration: 'Duration: 2 weeks',
          text: 'This is a fun jump & run game made with vanilla JavaScript.'
        },
        {
          title: 'How I have organised my work process',
          text: 'Game logic was modularized into classes and cleanly separated.'
        },
        {
          title: 'My group work experience',
          text: 'Solo project with mentoring, focused on OOP and animations.'
        }
      ]
    },
    {
      label: '3. Join',
      screenshot: '/assets/projects/img/Join.svg',
      technologies: [
        'assets/skills/icons/JavaScript.svg',
        'assets/skills/icons/CSS.svg',
        'assets/skills/icons/HTML.svg'
      ],
      live: 'https://deine-el-pollo-live-url.com',
      github: 'https://github.com/dein-projekt/el-pollo-loco',
      points: [
        {
          title: 'About the project',
          duration: 'Duration: 2 weeks',
          text: 'This is a fun jump & run game made with vanilla JavaScript.'
        },
        {
          title: 'How I have organised my work process',
          text: 'Game logic was modularized into classes and cleanly separated.'
        },
        {
          title: 'My group work experience',
          text: 'Solo project with mentoring, focused on OOP and animations.'
        }
      ]
    },
    {
      label: '4. Ongoing Project',
      screenshot: '',
      technologies: [],
      points: []
    }
  ];

  selectTab(index: number) {
    this.selectedTab = index;
  }
}

