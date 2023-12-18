import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoFieldModule,
    PoModule
  ],
  exports: [
    PoFieldModule,
    PoModule
  ]
})
export class SharedModule { }
