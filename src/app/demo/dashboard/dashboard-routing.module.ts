import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PermissionsGuard } from 'src/app/core/guards/permmisions.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        // canLoad: [AuthGuard],
        loadChildren: () => import('./dash-default/dash-default.module').then(module => module.DashDefaultModule)
      },

      {
        path: 'user',
        // canLoad: [AuthGuard],
        canActivate: [PermissionsGuard],
        loadChildren: () => import('../pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'store',
        // canLoad: [AuthGuard],
        loadChildren: () => import('../pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'elements',
        // canLoad: [AuthGuard],
        canActivate: [PermissionsGuard],
        loadChildren: () => import('../pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'inventories',
        // canLoad: [AuthGuard],
        loadChildren: () => import('../pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'reparations',
        // canLoad: [AuthGuard],
        loadChildren: () => import('../pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
