import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './home/hero/hero.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { WhyMeComponent } from './home/why-me/why-me.component';
import { SkillsComponent } from './home/skills/skills.component';
import { ProjectsComponent } from './home/projects/projects.component';
import { TestimonialsComponent } from './home/testimonials/testimonials.component';
import { ContactComponent } from './home/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './core/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    NavbarComponent,
    WhyMeComponent,
    SkillsComponent,
    ProjectsComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
