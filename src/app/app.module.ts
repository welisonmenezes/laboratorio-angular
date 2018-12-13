import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';

import { LoadingPageModule } from 'angular-loading-page';

import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PublicModule,
    AppRoutingModule,
    LoadingPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
