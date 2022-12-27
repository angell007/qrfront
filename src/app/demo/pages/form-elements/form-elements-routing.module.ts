import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PermissionsGuard } from 'src/app/core/guards/permmisions.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        // canLoad: [AuthGuard],
        canActivate: [PermissionsGuard],
        loadChildren: () => import('./user/user.module').then(module => module.UserModule)
      },
      {
        path: 'resource',
        // canLoad: [AuthGuard],
        loadChildren: () => import('./store/store.module').then(module => module.StoreModule)
      },
      {
        path: 'resource-element',
        // canLoad: [AuthGuard],
        canActivate: [PermissionsGuard],

        loadChildren: () => import('./element/element.module').then(module => module.ElementModule)
      },
      {
        path: 'resource-inventory',
        // canLoad: [AuthGuard],
        loadChildren: () => import('./inventory/inventory.module').then(module => module.InventoryModule)
      },
      {
        path: 'resource-operations',
        // canLoad: [AuthGuard],
        loadChildren: () => import('./reparationstype/reparationstype.module').then(module => module.ReparationstypeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormElementsRoutingModule { }
