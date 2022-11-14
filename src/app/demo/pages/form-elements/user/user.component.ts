import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userService } from 'src/app/services/user.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {


  loginForm: FormGroup;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private _user: userService) { }

  ngOnInit() {
    this.cleanForm()
  }

  onSubmit() {
    this.submitted = true;
    this._user.register(this.loginForm.value)
      .subscribe(resp => {
        if (resp.err) { functionsUtils.showErros(resp); return false; }
        Swal.fire('Success', 'Operación realizada correctamente', 'success');
        this.cleanForm()
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

  get form() { return this.loginForm.controls; }


  cleanForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required, Validators.min(6)]]
    });
  }

}
