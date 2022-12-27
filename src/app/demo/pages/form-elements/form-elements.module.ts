import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormElementsRoutingModule } from './form-elements-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';
import { ReparationstypeComponent } from './reparationstype/reparationstype.component';
import { IndexComponent } from './reparationstype/index/index.component';

@NgModule({
  imports: [
    CommonModule,
    FormElementsRoutingModule,
    SharedModule
  ],
  declarations: [ReparationstypeComponent, IndexComponent]
})
export class FormElementsModule { }
