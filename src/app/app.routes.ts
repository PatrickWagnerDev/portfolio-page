import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LegalNotice } from './pages/legal-notice/legal-notice';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { ProjectDetail } from './pages/project-detail/project-detail';

export const routes: Routes = [
  { path: '', component: Home, title: 'titles.home' },
  { path: 'project/:id', component: ProjectDetail, title: 'titles.project' },
  { path: 'legal-notice', component: LegalNotice, title: 'titles.legalNotice' },
  { path: 'privacy-policy', component: PrivacyPolicy, title: 'titles.privacyPolicy' },
  { path: '**', redirectTo: '' },
];
