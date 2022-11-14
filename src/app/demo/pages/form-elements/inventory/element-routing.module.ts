import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementComponent } from './element.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'register',
    component: ElementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementRoutingModule { }
