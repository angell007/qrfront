import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSigninV2RoutingModule } from './auth-signin-v2-routing.module';
import { AuthSigninV2Component } from './auth-signin-v2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AuthSigninV2Component],
  imports: [
    CommonModule,
    AuthSigninV2RoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule
  ]
})
export class AuthSigninV2Module { }
