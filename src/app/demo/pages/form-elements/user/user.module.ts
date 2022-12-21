import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UpdateComponent } from './update/update.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgbDropdownModule
    ],
  declarations: [UserComponent, UpdateComponent]
})
export class UserModule { }
