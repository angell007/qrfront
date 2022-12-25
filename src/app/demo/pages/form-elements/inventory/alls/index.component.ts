import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservablesService } from 'src/app/observables/observable.service';
import { inventoryService } from 'src/app/services/inventory.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { Subscription } from 'rxjs';
import { userService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { elementService } from 'src/app/services/element.service';

@Component({
  selector: 'app-inventory-all-index',
  templateUrl: './index.component.html',
  styleUrls: ['./element.component.scss']
})
export class allIndexComponent implements OnInit {


  loginForm: FormGroup;
  submitted = false;
  error = '';
  items: any = [];
  stores: any = [];
  img: any;
  show: boolean = false;
  current: boolean = false;
  id: string = null;
  public obsuser: Subscription
  load = false;
  showsearch: boolean = false
  // selectedItem: number;

  selectedStores: any = [];
  selectedVendors: any = [];
  code: any = '';
  checked: any = '';

  public filters: any = {
    vendors: '',
    stores: '',
    code: '',
    checked: '',
    date: ''
  }
  users: any;


  constructor(
    public toastEvent: ToastService,
    private _user: userService,
    private _inventory: inventoryService,
    private _element: elementService) { }

  ngOnInit() {

    this.getData()
    this.getStores()
    this.getUsers()


  }

  getStores() {
    this._inventory.stores()
      .subscribe(resp => {
        this.stores = resp.data
        this.showsearch = true
        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

  getUsers() {
    this._user.index()
      .subscribe(resp => {
        this.users = resp.data
        this.showsearch = true
        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

  filterInventories() {
    this.filters = {
      vendors: [this.selectedVendors],
      stores: [this.selectedStores],
      code: this.code,
      checked: this.checked,
      date: ''
    }

    this.getData()
  }

  async getData() {

    this.load = true
    this.show = true

    this._inventory.alls(this.filters)
      .subscribe(resp => {

        this.items = resp.data
        this.items.forEach(element => {
          element.show = false
        });

        this.load = false
        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }


  print(id: string, name: string) {

    let printContents, popupWin;

    printContents = document.getElementById(id).innerHTML.toString();
    printContents = (<string>printContents + "").replace("col-sm", "col-xs");
    popupWin = window.open("", 'popimpr', "top=0,left=0,height=100%,width=auto");
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    popupWin.document.write(`
          <html>
            <head>
              <title>Reporte ${name} </title>
              <meta name="viewport" content="width=10000, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
              <link rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
              <style>
                .salto_pagina_despues{
                  page-break-after:always;
                }
    
                .salto_pagina_anterior{
                  page-break-before:always;
                }
                .btn{
                  display:none
                }
                .noprint{
                  display:none
                }
    
              </style>
            </head>
            <body onload="window.print(); window.close();">
                <div class="container">
    
                <span> <b> Usuario: </b> ${name} </span>
                <br>
                <span> <b>Fecha:</b> ${day}-${month}-${year}</span>
                <br>
                <br>
              
                      ${printContents}
              </div>
            </body>
          </html>`);
    popupWin.document.close();
  }


  getexcel(id) {

    this.toastEvent.toast({ uid: 'toastRight2', delay: 2100 })

    this._user.getexcel(id)
      .subscribe(resp => {
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
    link.download = 'reporte';
    link.click();
  }


  printQr(id) {
    this.toastEvent.toast({ uid: 'toastRight2', delay: 2100 })
    this._user.getpdflist(id)
      .subscribe(resp => {
        let fileName = 'qrReference'
        this.downloadFile2(resp.body);
        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

  downloadFile2(data: Blob) {
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = 'qrReference';
    link.click();
  }


  showDetail(item) {

    this.items.forEach(element => {
      element.show = false
    });

    item.show = true
  }

  hiddenDetail() {
    this.items.forEach(element => {
      element.show = false
    });
  }

  status(item) {

    this.toastEvent.toast({ uid: 'toastRight2', delay: 2000 })

    this._element.changuestatus({ id: item.id })
      .subscribe(resp => {
        item.status = resp.data.item.status
        // item.status =  item.status == 'activo' ? 'inactivo' : 'activo'
        // this.getData();
        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

  checkedInv(item) {

    this.toastEvent.toast({ uid: 'toastRight2', delay: 2000 })

    this._inventory.changuestatus(item.id)
      .subscribe(resp => {
        item.check = resp.data.item.check
        // item.status =  item.status == 'activo' ? 'inactivo' : 'activo'
        // this.getData();
        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

}
