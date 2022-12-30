import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { storeService } from 'src/app/services/store.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {


    ModelForm: FormGroup;
    submitted = false;
    error = '';

    constructor(private router: Router, private formBuilder: FormBuilder, private _store: storeService) { }

    ngOnInit() {
        this.cleanForm()
    }

    onSubmit() {
        this.submitted = true;
        this._store.register(this.ModelForm.value)
            .subscribe(resp => {
                if (resp.err) { functionsUtils.showErros(resp); return false; }
                Swal.fire('Success', 'Well done', 'success');
                this.cleanForm()
                this.router.navigate(['/dashboard/store/resource/index']);
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }

    get form() { return this.ModelForm.controls; }


    cleanForm() {
        this.ModelForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            quantity_elements: [0]
        });
    }

}
