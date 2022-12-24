import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { elementService } from 'src/app/services/element.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs-compat';

import { AngularNotificationService, NotifComponent } from 'angular-notification-alert';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-element-index',
    templateUrl: './index.component.html',
    styleUrls: ['./element.component.scss']
})
export class IndexComponent implements OnInit {


    loginForm: FormGroup;
    submitted = false;
    error = '';
    items: any;
    img: any;
    show: boolean = false;
    current: boolean = false;
    showelements: boolean = false;
    page = 1;
    total = null;
    params = {}
    filters = {
        page: 1,
        name: '',
        sku: '',
        sheet_size: '',
        status: '',
    }
    query = null

    @ViewChild('parent', { read: ViewContainerRef }) target: ViewContainerRef;
    private componentRef: ComponentRef<any>;

    // public filter: string;
    filterUpdate = new Subject<string>();
    productimg: string;

    constructor(
        private _element: elementService,
        public toastEvent: ToastService,
        private _crud: CrudService,
        private router: Router
    ) {
        this._crud.model = 'elements'
    }

    ngOnInit() {
        this.getData();
        this.filterUpdate.pipe(
            debounceTime(500),
            distinctUntilChanged())
            .subscribe(() => { this.filters.page = 1; this.getData() });
    }

    recall($event: number) {
        this.page = $event;
        this.filters.page = $event
        this.getData()
    }

    getData() {

        this.showelements = false
        this._element.index(this.filters)
            .subscribe(resp => {
                this.items = resp.data.data
                // this.page = resp.data.current_page
                this.total = resp.data.total
                this.items.forEach(element => {
                    element.show = false
                });
                this.showelements = true
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

    printQr(id) {

        this.toastEvent.toast({ uid: 'toastRight2', delay: 2100 })

        this._element.getpdflist(id)
            .subscribe(resp => {
                let fileName = 'qrReference'
                this.downloadFile(resp.body);
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }

    downloadFile(data: Blob) {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(data);
        link.download = 'qrReference';
        link.click();
    }

    showQr(item) {

        this.items.forEach(element => {
            element.show = false
        });

        item.show = true
        this.img = environment.base_media + 'items/qr' + item.id + '.png'
        this.productimg = environment.base_media + 'imgproducts/' + item.photo
        console.log(this.img);
    }

    status(item) {

        this.toastEvent.toast({ uid: 'toastRight2', delay: 1500 })

        this._element.changuestatus({ id: item.id })
            .subscribe(resp => {
                item.status = (item.status == 'activo') ? 'inactivo' : 'activo'
                // this.getData();
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }

    goEdit(id) {
        console.log(id);
        this.router.navigate(['/dashboard/elements/resource-element/update'], { queryParams: { hash: id } });
    }

    clean() {
        this.filters = {
            page: 1,
            name: '',
            sku: '',
            sheet_size: '',
            status: '',
        }
        this.getData()
    };
}
