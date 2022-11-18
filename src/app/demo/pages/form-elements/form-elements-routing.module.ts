import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./user/user.module').then(module => module.UserModule)
      },
      {
        path: 'resource',
        loadChildren: () => import('./store/store.module').then(module => module.StoreModule)
      },
      {
        path: 'resource-element',
        loadChildren: () => import('./element/element.module').then(module => module.ElementModule)
      },
      {
        path: 'resource-inventory',
        loadChildren: () => import('./inventory/inventory.module').then(module => module.InventoryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormElementsRoutingModule { }
