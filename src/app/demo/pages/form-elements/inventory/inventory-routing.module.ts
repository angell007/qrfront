import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PermissionsGuard } from 'src/app/core/guards/permmisions.guard';
import { MyownersComponent } from '../user/myowners/myowners.component';
import { allIndexComponent } from './alls/index.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path: 'register',
    component: InventoryComponent
  },
  {
    path: 'myowners/:id',
    canActivate: [PermissionsGuard],
    component: MyownersComponent
  },

  {
    path: 'alls',
    canActivate: [PermissionsGuard],
    component: allIndexComponent
  },
  {
    path: 'myauthowners',
    component: MyownersComponent

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
