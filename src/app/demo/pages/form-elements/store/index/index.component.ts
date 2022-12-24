import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { storeService } from 'src/app/services/store.service';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-store-index',
    templateUrl: './index.component.html',
    styleUrls: ['./element.component.scss']

})
export class IndexComponent implements OnInit {


    loginForm: FormGroup;
    submitted = false;
    error = '';
    items: any;
    show: boolean = false;
    img: string;

    constructor(
        private _store: storeService,
        private _crud: CrudService,
        private router: Router,
        public toastEvent: ToastService,
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


    delete(item) {
        // this.show = false
        this.toastEvent.toast({ uid: 'toastRight2', delay: 2000 })
        this._crud.delete(item.id)
            .subscribe(resp => {
                item.status = (item.status == 1) ? 0 : 1
                // this.items = resp.data.data
                // this.getData()
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }

    goEdit(id) {
        this.router.navigate(['/dashboard/store/resource/update'], { queryParams: { hash: id } });
    }

    printQr(id) {

        this.toastEvent.toast({ uid: 'toastRight2', delay: 2100 })

        this._store.getpdflist(id)
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
        this.img = environment.base_media + 'stores/qrs' + item.id + '.png'
        console.log(this.img);
    }
}
