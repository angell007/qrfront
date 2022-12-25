import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthChangePasswordRoutingModule } from './auth-change-password-routing.module';
import { AuthChangePasswordComponent } from './auth-change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthChangePasswordRoutingModule,
    FormsModule,

    // HttpClientModule,
    CommonModule,
    ReactiveFormsModule,

  ],
  declarations: [AuthChangePasswordComponent]
})
export class AuthChangePasswordModule { }
