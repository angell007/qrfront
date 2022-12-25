import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseContract } from 'src/app/core/class/ResponseContract';
import { elementService } from 'src/app/services/element.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { environment } from 'src/environments/environment';
import { NgxImageCompressService } from "ngx-image-compress";

import Swal from 'sweetalert2';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';

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
  photo?: string = '';
  imgResultBeforeCompression: string = "";
  imgResultAfterCompression: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private _crud: CrudService,
    private router: Router,
    private imageCompress: NgxImageCompressService
  ) { this._crud.model = 'elements' }

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

    if (this.photo != '') formData.append("file", this.photo);

    this._crud.sendRegiserWithFile(formData).subscribe((resp: ResponseContract) => {
      console.log(resp);
      Swal.fire('Success', 'Operación realizada correctamente', 'success');
      this.cleanForm()
      this.photo = null
      this.router.navigate(['/dashboard/elements/resource-element/index']);
    }, (err) => {
      console.log(Object.keys(err));
      console.log(err.error);
      if (err.error.errors) { Swal.fire('Warning', err.error.errors, 'warning'); return false; }
      if (typeof (err.error) == 'object') { functionsUtils.showErros2(err); return false; }
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

  compressFile() {
    this.imageCompress.uploadFile().then(
      ({ image, orientation }) => {

        this.imgResultBeforeCompression = image;
        // console.log("Size in bytes of the uploaded image was:", this.imageCompress.byteCount(image));
        this.imageCompress
          .compressFile(image, orientation, 50, 45) // 50% ratio, 50% quality
          .then(
            (compressedImage) => {
              this.imgResultAfterCompression = compressedImage;
              this.photo = compressedImage
              console.log(this.photo);
              // console.log("Size in bytes after compression is now:", this.imageCompress.byteCount(compressedImage));
            }
          );
      }
    );
  }

}
