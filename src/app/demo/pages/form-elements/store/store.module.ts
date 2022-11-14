import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreComponent } from './store.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    NgbDropdownModule
  ],
  declarations: [StoreComponent, IndexComponent]
})
export class StoreModule { }
