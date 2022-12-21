import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { storeService } from 'src/app/services/store.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';

@Component({
    selector: 'app-store-index',
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {


    loginForm: FormGroup;
    submitted = false;
    error = '';
    items: any;
    show: boolean = false;

    constructor(
        private _store: storeService,
        private _crud: CrudService,
        private router: Router
    ) { this._crud.model = 'stores' }


    ngOnInit() {
        this.getData()
    }

    getData() {
        this._store.index()
            .subscribe(resp => {
                this.items = resp.data.data
                this.show = true
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }


    delete(id) {
        this.show = false
        this._crud.delete(id)
            .subscribe(resp => {
                this.items = resp.data.data
                this.getData()
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }

    goEdit(id) {
        this.router.navigate(['/dashboard/store/resource/update'], { queryParams: { hash: id } });
    }
}
