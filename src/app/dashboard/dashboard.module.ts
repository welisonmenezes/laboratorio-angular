import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AddComponent } from './add/add.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { CustomSelectModule } from './../shared/directives/custom.select.module';
import { ErrorMessageComponent } from './../core/error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomSelectModule
  ],
  declarations: [
    DashboardComponent, 
    AddComponent, 
    InicioComponent,
    ErrorMessageComponent
  ]
})
export class DashboardModule { }
