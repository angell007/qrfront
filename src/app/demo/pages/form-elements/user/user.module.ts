import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UpdateComponent } from './update/update.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { MyownersComponent } from './myowners/myowners.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgSelectModule,
    NgbTooltipModule,
    FormsModule,
  ],
  declarations: [UserComponent, UpdateComponent, MyownersComponent]
})
export class UserModule { }
