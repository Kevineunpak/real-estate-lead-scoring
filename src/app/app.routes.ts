import { Routes } from '@angular/router';
import { LeadFormComponent } from './components/lead-form/lead-form.component';

export const routes: Routes = [
  { path: '', component: LeadFormComponent },  // ✅ Default route
  { path: '**', redirectTo: '', pathMatch: 'full' }  // ✅ Redirect unknown routes
];
