import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { matchValidator } from 'src/app/core/validators/CustomValidators';
// import { CustomValidators } from 'src/app/core/validators/CustomValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-change-password',
  templateUrl: './auth-change-password.component.html',
  styleUrls: ['./auth-change-password.component.scss']
})
export class AuthChangePasswordComponent implements OnInit {

  form: FormGroup;
  submitted: boolean;

  constructor(public fb: FormBuilder, private _user: UserService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        // Validators.minLength(6),
        Validators.maxLength(25),
        matchValidator('confirmPassword', true)
      ]],
      confirmPassword: ['', [
        Validators.required,
        matchValidator('newPassword')
      ]],
    })
  }

  get f() { return this.form.controls; }


  onSubmit() {
    this.submitted = true;
    this._user.changePassword(this.form.value)
      .subscribe(resp => {
        this._user.logout()
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', 'wrong credentials', 'error');
        this.submitted = false;
      });
  }

  get passwordMatchError() {
    console.log('x');
    return (
      this.form.getError('mismatch') &&
      this.form.get('confirmPassword')?.touched
    );
  }

}
