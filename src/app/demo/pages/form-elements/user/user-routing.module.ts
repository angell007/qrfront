import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: 'index',
    loadChildren: () => import('../../tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
  },
  {
    path: 'register',
    component: UserComponent
  },
  {
    path: 'update',
    component: UpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
