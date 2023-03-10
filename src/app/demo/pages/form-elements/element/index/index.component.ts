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
import { ActivatedRoute, Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ResponseContract } from 'src/app/core/class/ResponseContract';
import Swal from 'sweetalert2';


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
    currentItem: any;
    img: any;
    show: boolean = false;
    current: boolean = false;
    showelements: boolean = false;
    page = 1;
    from = 1;
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
        private router: Router,
        private route: ActivatedRoute
    ) {
        this._crud.model = 'elements'
    }

    ngOnInit() {

        this.route.queryParams
            .subscribe((params: any) => this.page = params.page ?? 1)

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
                this.from = resp.data.from
                this.items = resp.data.data
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
                item.status = resp.data.item.status
                // item.status = (item.status == 'activo')
                // item.status = (item.status == 'activo')
                //  ? 'inactivo' : 'activo'
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }

    goEdit(id) {
        this.router.navigate(['/dashboard/elements/resource-element/update'], { queryParams: { hash: id, page: this.page } });
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

    delete(item) {

        Swal.fire({
            title: 'Do you want delete ?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {

                // this.show = false
                this.toastEvent.toast({ uid: 'toastRight2', delay: 2000 })
                this._crud.delete(item.id)
                    .subscribe(resp => {
                        // delete this.items[i-1];
                        // functionsUtils.deleteByValue(this.items, item.id)
                        // item.status = (item.status == 1) ? 0 : 1
                        // this.items = resp.data.data
                        this.getData()
                        if (resp.err) { functionsUtils.showErros(resp); return false; }
                    }, (err) => {
                        console.log(Object.keys(err));
                        console.log(err.err);
                    });
            }
        })
    }


    fileToBase64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.toString());
            reader.onerror = error => reject(error);
        })
    }

    onSelect(event, item) {
        const formData: FormData = new FormData();
        for (const k in item) {
            const v = item[k];
            if (k == 'sheet_size') formData.append('size', v)
            if (k != 'sheet_size') formData.append(k, v)
        }

        if (event.addedFiles[0] != '' && event.addedFiles[0] != null)
            this.fileToBase64(event.addedFiles[0])
                .then(result => {
                    const base64String = result;
                    formData.append("file", base64String);
                    this._crud.sendUpdateWithFile(formData).subscribe((resp) => {
                        item.photo = resp.data.item.photo
                        Swal.fire('Success', 'Good job', 'success');
                    }, (err) => {
                        console.log(Object.keys(err));
                        console.log(err.error);
                        if (typeof (err.error) == 'object') { functionsUtils.showErros2(err); return false; }
                    });
                });
    }
}
