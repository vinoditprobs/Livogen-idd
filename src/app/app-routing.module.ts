import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [
  {path: '', component: HomepageComponent },
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  {path: 'application', component: ApplicationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
