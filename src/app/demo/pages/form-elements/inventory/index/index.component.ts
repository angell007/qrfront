import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservablesService } from 'src/app/observables/observable.service';
import { inventoryService } from 'src/app/services/inventory.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-element-index',
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {


    loginForm: FormGroup;
    submitted = false;
    error = '';
    items: any = [];
    img: any;
    show: boolean = false;
    current: boolean = false;
    id: string = null;
    public obsuser: Subscription
    load = false;
    constructor(private route: ActivatedRoute, private _inventory: inventoryService, private _obs: ObservablesService, private router: Router) { }

    ngOnInit() {
        this.route.queryParams
            .subscribe((params: any) => {
                console.log(params.id);
                document.cookie = "current=" + params.id
                this.getData(params.id)
            }
            );

    }

    async getData(id) {

        this.id = id

        this.load = true
        this.show = true

        this._inventory.owners(this.id)
            .subscribe(resp => {
                this.items = resp.data
                this.load = false
                this.markAsRead(this.id)
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }

    async markAsRead(id) {

        this.id = this.getCookie('current')
        this._inventory.markAsRead(id)
            .subscribe(resp => {
                console.log('ok mark as read');
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }


    getCookie(cname: string) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

}
