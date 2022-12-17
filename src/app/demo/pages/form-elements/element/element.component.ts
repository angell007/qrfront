import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { elementService } from 'src/app/services/element.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  ModelForm: FormGroup;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private _element: elementService) { }

  ngOnInit() {
    this.cleanForm()
  }

  onSubmit() {
    this.submitted = true;
    this._element.register(this.ModelForm.value)
      .subscribe(resp => {
        if (resp.err) { functionsUtils.showErros(resp); return false; }
        Swal.fire('Success', 'Operación realizada correctamente', 'success');
        this.cleanForm()
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

  get form() { return this.ModelForm.controls; }


  cleanForm() {
    this.ModelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      // reference: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      material: ['', [Validators.required]],
      size: ['', [Validators.required]],
      packing: ['', [Validators.required]],
     
    });
  }
}
