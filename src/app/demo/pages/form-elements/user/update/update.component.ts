import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from 'src/app/services/user.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private _user: userService) { }


  loginForm: FormGroup;
  submitted = false;
  show = false;
  error = '';
  sending = false


  ngOnInit() {
    this.cleanForm()
    this.getData()

  }

  getData() {

    this.route.queryParams
      .subscribe((params: any) => {
        this._user.getData(params.hash)
          .subscribe(resp => {

            console.log(resp.data);

            this.loginForm = this.formBuilder.group({
              name: [resp.data.name, [Validators.required]],
              id: [resp.data.id, [Validators.required]],
              email: [resp.data.email, [Validators.required]],
              user_type: [resp.data.user_type, [Validators.required]],
              password: [null, [Validators.min(6)]]

            });

            this.show = true;
            if (resp.err) { functionsUtils.showErros(resp); return false; }
            // Swal.fire('Success', 'Datos recuperados', 'success');
          }, (err) => {
            console.log(Object.keys(err));
            console.log(err.err);
          });
      }
      );


  }

  onSubmit() {
    this.submitted = true;
    this.sending = true
    this._user.update(this.loginForm.value)
      .subscribe(resp => {
        if (resp.err) { functionsUtils.showErros(resp); return false; }
        Swal.fire('Success', 'Well done', 'success');
        this.cleanForm()
        this.router.navigate(['/dashboard/user/index']);
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
      user_type: ['', [Validators.required]],
      password: ['', [Validators.min(6)]]
    });
  }

}
