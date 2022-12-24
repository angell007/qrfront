import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TblSizingRoutingModule } from './tbl-sizing-routing.module';
import { TblSizingComponent } from './tbl-sizing.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TblSizingComponent],
  imports: [
    CommonModule,
    TblSizingRoutingModule,
    SharedModule,
    NgbTooltipModule
  ]
})
export class TblSizingModule { }
