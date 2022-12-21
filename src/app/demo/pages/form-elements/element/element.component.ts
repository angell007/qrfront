import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseContract } from 'src/app/core/class/ResponseContract';
import { elementService } from 'src/app/services/element.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { environment } from 'src/environments/environment';
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

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  preview: string;
  currentFile?: File;
  httpClient: HttpClient;

  constructor(private formBuilder: FormBuilder, private _element: elementService, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  ngOnInit() {
    this.cleanForm()
  }

  onSubmit() {
    this.submitted = true;

    const formData: FormData = new FormData();
    for (const k in this.ModelForm.value) {
      const v = this.ModelForm.value[k];
      formData.append(k, v)
    }

    formData.append("file", this.file, this.file.name);
    this.httpClient.post(`${environment.base_url}/elements/register`, formData, {
      reportProgress: true,
      responseType: 'json',
    }).subscribe((resp: ResponseContract) => {
      console.log(resp);
      // Swal.fire('Success', 'Operación realizada correctamente', 'success');
      this.cleanForm()
    }, (err) => {
      console.log(Object.keys(err));
      console.log(err.error);
      if (err.error.errors) { Swal.fire('Warning', err.error.errors, 'warning'); return false; }
      if (typeof (err.error) == 'object') { functionsUtils.showErros2(err); return false; }
      // if (typeof (err.error) == 'object') { functionsUtils.showErros(err.error); return false; }
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
      // file: [''],

    });
  }

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
    console.log(`Image size before compressed: ${this.file.size} bytes.`)

    if (this.file) {
      this.preview = '';
      this.currentFile = this.file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(this.currentFile);
    }
  }
}
