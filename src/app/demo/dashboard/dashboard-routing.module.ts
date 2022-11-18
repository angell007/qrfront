import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        loadChildren: () => import('./dash-default/dash-default.module').then(module => module.DashDefaultModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'store',
        loadChildren: () => import('../pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'elements',
        loadChildren: () => import('../pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'inventories',
        loadChildren: () => import('../pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
