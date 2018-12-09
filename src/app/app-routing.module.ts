import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicComponent } from './public/public.component';

const appRoutes: Routes = [
  {
    path: '',
    component: PublicComponent
  },
  {
    path: 'admin',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
