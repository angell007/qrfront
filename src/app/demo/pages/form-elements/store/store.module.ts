import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreComponent } from './store.component';
import { IndexComponent } from './index/index.component';
import { UpdateComponent } from './update/update.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    NgbTooltipModule,
    NgbDropdownModule,

    NgSelectModule,
    FormsModule,

  ],
  declarations: [StoreComponent, IndexComponent, UpdateComponent]
})
export class StoreModule { }
