import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { AddComponent } from './add/add.component';
import { InicioComponent } from './inicio/inicio.component';

const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: InicioComponent
            },
            {
                path: 'add',
                component: AddComponent
            }
        ]
    }
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
      RouterModule
    ],
    declarations: []
  })
  export class DashboardRoutingModule { }