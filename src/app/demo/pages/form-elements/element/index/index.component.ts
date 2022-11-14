import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { elementService } from 'src/app/services/element.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-element-index',
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {


    loginForm: FormGroup;
    submitted = false;
    error = '';
    items: any;
    img: any;
    show: boolean = false;
    current: boolean = false;

    constructor(private _element: elementService) { }


    ngOnInit() {
        this.getData()
    }

    getData() {
        this._element.index()
            .subscribe(resp => {
                this.items = resp.data.data
                this.items.forEach(element => {
                    element.show = false
                });

                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }

    hideQr(user) {
        user.show = false
        this.img = ''
    }

    showQr(user) {

        this.items.forEach(element => {
            element.show = false
        });

        user.show = true
        this.img = environment.base_media + 'imgs/stores/qr' + user.id + '.png'
        console.log(this.img);
    }
}
