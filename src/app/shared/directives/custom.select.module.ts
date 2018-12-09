import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomSelectDirective } from './custom.select.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomSelectDirective
  ],
  exports: [
      CustomSelectDirective
  ]
})
export class CustomSelectModule { }
