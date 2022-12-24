import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { allIndexComponent } from './alls/index.component';
import { IndexuserComponent } from './indexuser/indexuser.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [InventoryComponent, IndexComponent, allIndexComponent, IndexuserComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ZXingScannerModule,
    NgbTooltipModule,
    // BrowserModule
  ]
})
export class InventoryModule { }
