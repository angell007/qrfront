import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { elementService } from 'src/app/services/element.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs-compat';

import { AngularNotificationService, NotifComponent } from 'angular-notification-alert';


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
    page = 1;
    total = null;
    params = {}
    query = null

    @ViewChild('parent', { read: ViewContainerRef }) target: ViewContainerRef;
    private componentRef: ComponentRef<any>;

    public filter: string;
    filterUpdate = new Subject<string>();

    constructor(private _element: elementService, private Service: AngularNotificationService,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.addNotifElement();
        this.params = {
            page: 1,
            name: this.query,
            reference: this.query
        }
    }


    addNotifElement() {
        let setting = {
            width: '300px',
            type: 'danger',
            title: 'this an error message',
            body: '<b>Something went wrong </b> check it out',
            position: 'center',
            duration: 4000,
            background: '#fff'
        };
        this.Service.setProperties(setting);
        const childComponent = this.componentFactoryResolver.resolveComponentFactory(NotifComponent);
        this.componentRef = this.target.createComponent(childComponent);
    }

    ngOnInit() {
        this.getData();
        this.filterUpdate.pipe(
            debounceTime(500),
            distinctUntilChanged())
            .subscribe(value => {
                this.query = value
                this.params = {
                    page: 1,
                    name: value,
                    reference: value
                }
                this.getData();
            });
    }

    recall($event: number) {
        this.page = $event;
        this.params = this.params = {
            page: $event,
            name: this.query,
            reference: this.query
        }
        this.getData()
    }

    getData() {

        this._element.index(this.params)
            .subscribe(resp => {
                this.items = resp.data.data
                // this.page = resp.data.current_page
                this.total = resp.data.total
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

    printQr(id) {
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

    showQr(user) {

        this.items.forEach(element => {
            element.show = false
        });

        user.show = true
        this.img = environment.base_media + 'items/qr' + user.id + '.png'
        console.log(this.img);
    }

    status(id) {
        this.addNotifElement();
        this._element.changuestatus({ id: id })
            .subscribe(resp => {
                this.getData();
                if (resp.err) { functionsUtils.showErros(resp); return false; }
            }, (err) => {
                console.log(Object.keys(err));
                console.log(err.err);
            });
    }
}
