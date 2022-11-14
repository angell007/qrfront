import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: 'index',
    loadChildren: () => import('../../tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
  },
  {
    path: 'register',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
