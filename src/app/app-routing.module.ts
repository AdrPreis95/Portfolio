import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalNoticeComponent } from './core/legal-notice/legal-notice.component';


const routes: Routes = [
  { path: 'legal-notice', component: LegalNoticeComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
