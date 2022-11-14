import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { storeService } from 'src/app/services/store.service';
import { userService } from 'src/app/services/user.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-store-index',
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {


    loginForm: FormGroup;
    submitted = false;
    error = '';
    items: any;

    constructor(private _store: storeService) { }


    ngOnInit() {
        this.getData()
    }

    getData() {
        this._store.index()
            .subscribe(resp => {
                this.items = resp.data.data
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }

}
