import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseContract } from 'src/app/core/class/ResponseContract';
import { UpdateContract } from 'src/app/core/class/UpdateContract';
import { CrudService } from 'src/app/services/crud.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { NgxImageCompressService } from "ngx-image-compress";

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

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
  photo?: string = '';
  imgResultBeforeCompression: string = "";
  imgResultAfterCompression: string = "";

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _crud: CrudService,
    private imageCompress: NgxImageCompressService) {
    this._crud.model = 'elements'
  }

  ngOnInit(): void { this.getData() }



  getData() {
    this.route.queryParams
      .subscribe((params: any) => {
        this._crud.getData(params.hash)
          .subscribe((resp: ResponseContract) => {
            this.imgResultAfterCompression = environment.base_media + 'imgproducts/' + resp.data.photo
            this.modelForm = this.formBuilder.group({
              name: [resp.data.name, [Validators.required]],
              sku: [resp.data.sku, [Validators.required]],
              material: [resp.data.material],
              size: [resp.data.sheet_size, [Validators.required]],
              packing: [resp.data.packing, [Validators.required]],
              id: [resp.data.id, [Validators.required]],
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

    const formData: FormData = new FormData();
    for (const k in this.modelForm.value) {
      const v = this.modelForm.value[k];
      formData.append(k, v)
    }

    if (this.photo != '') formData.append("file", this.photo);

    this._crud.sendUpdateWithFile(formData).subscribe((resp: ResponseContract) => {
      Swal.fire('Success', 'Good job', 'success');
      this.cleanForm()
      this.photo = null
      let page = 1;
      this.route.queryParams.subscribe((params: any) => page = params.page)
      this.router.navigate(['/dashboard/elements/resource-element/index'], { queryParams: { page: page } });
    }, (err) => {
      console.log(Object.keys(err));
      console.log(err.error);
      if (err.error.errors) { Swal.fire('Warning', err.error.errors, 'warning'); return false; }
      if (typeof (err.error) == 'object') { functionsUtils.showErros2(err); return false; }
    });
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
              // console.log("Size in bytes after compression is now:", this.imageCompress.byteCount(compressedImage));
            }
          );
      }
    );
  }


  cleanForm() {
    this.modelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      material: [''],
      size: ['', [Validators.required]],
      packing: ['', [Validators.required]],
      id: ['', [Validators.required]],
    });
  }


  get form() { return this.modelForm.controls; }

}
