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



@NgModule({
  declarations: [InventoryComponent, IndexComponent, allIndexComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ZXingScannerModule,
    // BrowserModule
  ]
})
export class InventoryModule { }
