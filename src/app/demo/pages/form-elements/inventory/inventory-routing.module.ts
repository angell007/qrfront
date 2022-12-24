import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyownersComponent } from '../user/myowners/myowners.component';
import { UpdateComponent } from '../user/update/update.component';
import { allIndexComponent } from './alls/index.component';
import { IndexComponent } from './index/index.component';
import { IndexuserComponent } from './indexuser/indexuser.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path: 'index/:id',
    component: IndexuserComponent
  },
  {
    path: 'register',
    component: InventoryComponent
  },
  {
    path: 'myowners/:id',
    component: MyownersComponent
    // /dashboard/inventories/resource-inventory/myowners
  },
  {
    path: 'alls',
    component: allIndexComponent
    // /dashboard/inventories/resource-inventory/myowners
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
