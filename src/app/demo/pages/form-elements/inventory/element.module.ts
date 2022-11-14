import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementComponent } from './element.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ElementRoutingModule } from './element-routing.module';



@NgModule({
  declarations: [ElementComponent, IndexComponent],
  imports: [
    CommonModule,
    ElementRoutingModule,
    SharedModule,
  ]
})
export class ElementModule { }
