import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementComponent } from './element.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ElementRoutingModule } from './element-routing.module';
import { NgbAlertModule, NgbButtonsModule, NgbDropdownModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateComponent } from './update/update.component';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [ElementComponent, IndexComponent, UpdateComponent],
  imports: [
    CommonModule,
    ElementRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbTooltipModule,
    NgxDropzoneModule
  ]
})
export class ElementModule { }