import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticationRoutingModule } from './demo/pages/authentication/authentication-routing.module';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
      }
    ]
  },

  {
    path: '**',
    redirectTo: '/dashboard/default',
    pathMatch: 'full'
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' }),
    AuthRoutingModule,
    AuthenticationRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
