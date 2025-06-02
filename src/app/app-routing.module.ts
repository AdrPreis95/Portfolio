import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalNoticeComponent } from './core/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './core/privacy-policy/privacy-policy.component';


const routes: Routes = [
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
