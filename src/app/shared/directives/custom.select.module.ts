import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomSelectDirective } from './custom.select.directive';
import { SelectAsListDirective } from './select.as.list.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomSelectDirective,
    SelectAsListDirective
  ],
  exports: [
      CustomSelectDirective,
      SelectAsListDirective
  ]
})
export class CustomSelectModule { }
