import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseContract } from 'src/app/core/class/ResponseContract';
import { UpdateContract } from 'src/app/core/class/UpdateContract';
import { CrudService } from 'src/app/services/crud.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, UpdateContract {

  modelForm: FormGroup;
  submitted = false;
  show = false;
  error = '';
  sending = false


  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _crud: CrudService) {
    this._crud.model = 'stores'
  }

  ngOnInit(): void { this.getData() }



  getData() {
    this.route.queryParams
      .subscribe((params: any) => {
        this._crud.getData(params.hash)
          .subscribe((resp: ResponseContract) => {

            this.modelForm = this.formBuilder.group({
              name: [resp.data.name, [Validators.required]],
              id: [resp.data.id, [Validators.required]],
              address: [resp.data.address, [Validators.required]],

            });
            this.show = true;
            if (resp.err) { functionsUtils.showErros(resp); return false; }
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
    this._crud.update(this.modelForm.value)
      .subscribe((resp: ResponseContract) => {
        if (resp.err) { functionsUtils.showErros(resp); return false; }
        Swal.fire('Success', 'Operación realizada correctamente', 'success');
        this.cleanForm()
        this.router.navigate(['/dashboard/store/resource/index']);
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

  cleanForm() {
    this.modelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      address: ['', [Validators.required]],

    });
  }


  get form() { return this.modelForm.controls; }

}
