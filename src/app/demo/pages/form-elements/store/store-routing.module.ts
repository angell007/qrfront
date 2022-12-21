import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { StoreComponent } from './store.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'register',
    component: StoreComponent
  },
  {
    path: 'update',
    component: UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
