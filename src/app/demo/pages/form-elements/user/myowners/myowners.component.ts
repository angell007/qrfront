import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';
import { UserService } from 'src/app/core/services/user.service';
import { ObservablesService } from 'src/app/observables/observable.service';
import { elementService } from 'src/app/services/element.service';
import { inventoryService } from 'src/app/services/inventory.service';
import { userService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';


@Component({
  selector: 'app-myowners',
  templateUrl: './myowners.component.html',
  styleUrls: ['./myowners.component.scss']
})
export class MyownersComponent implements OnInit {

  // submitted = false;
  // error = '';
  // items: any = [];
  // img: any;
  // show: boolean = false;
  // current: boolean = false;
  // id: string = null;
  // load = false;
  // user: any;

  // constructor(private route: ActivatedRoute, private _user: userService, public toastEvent: ToastService) { }

  // ngOnInit() {

  //   this.route.queryParams
  //     .subscribe((params: any) => {
  //       this.getData(params.hash)
  //     }
  //     );
  // }

  // print(id: string) {
  //   let printContents, popupWin;
  //   printContents = document.getElementById(id).innerHTML.toString();
  //   printContents = (<string>printContents + "").replace("col-sm", "col-xs");
  //   popupWin = window.open("", 'popimpr', "top=0,left=0,height=100%,width=auto");
  //   const date = new Date();

  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();

  //   popupWin.document.write(`
  //     <html>
  //       <head>
  //         <title>Reporte ${this.user.name} </title>
  //         <meta name="viewport" content="width=10000, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  //         <link rel="stylesheet"
  //         href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  //         integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  //         <style>
  //           .salto_pagina_despues{
  //             page-break-after:always;
  //           }

  //           .salto_pagina_anterior{
  //             page-break-before:always;
  //           }
  //           .btn{
  //             display:none
  //           }
  //           .noprint{
  //             display:none
  //           }

  //         </style>
  //       </head>
  //       <body onload="window.print(); window.close();">
  //           <div class="container">

  //           <span> <b> Usuario: </b> ${this.user.name}</span>
  //           <br>
  //           <span> <b>Fecha:</b> ${day}-${month}-${year}</span>
  //           <br>
  //           <br>

  //                 ${printContents}
  //         </div>
  //       </body>
  //     </html>`);
  //   popupWin.document.close();
  // }

  // printQr(id) {

  //   this.toastEvent.toast({ uid: 'toastRight2', delay: 1500 })

  //   this._user.getpdflist(id)
  //     .subscribe(resp => {
  //       let fileName = 'qrReference'
  //       this.downloadFile2(resp.body);
  //       if (resp.err) { functionsUtils.showErros(resp); return false; }
  //     }, (err) => {
  //       console.log(Object.keys(err));
  //       console.log(err.err);
  //     });
  // }

  // downloadFile2(data: Blob) {
  //   var link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(data);
  //   link.download = 'qrReference';
  //   link.click();
  // }


  // getexcel(id) {
  //   this._user.getexcel(id)
  //     .subscribe(resp => {

  //       let fileName = 'inventory'

  //       // const contentDisposition = resp.headers.get('Content-Disposition');
  //       // if (contentDisposition) {
  //       //   const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  //       //   const matches = fileNameRegex.exec(contentDisposition);
  //       //   if (matches != null && matches[1]) {
  //       //     fileName = matches[1].replace(/['"]/g, '');
  //       //   }
  //       // }

  //       this.downloadFile(resp.body);
  //       if (resp.err) { functionsUtils.showErros(resp); return false; }
  //     }, (err) => {
  //       console.log(Object.keys(err));
  //       console.log(err.err);
  //     });

  // }

  // downloadFile(data: Blob) {
  //   var link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(data);
  //   link.download = 'reporte';
  //   link.click();
  // }


  // async getData(id) {

  //   this.load = true
  //   this.show = true

  //   this._user.myowners(id)
  //     .subscribe(resp => {
  //       this.items = resp.data
  //       if (this.items.length > 0) this.user = this.items[0].user
  //       this.load = false
  //       if (resp.err) { functionsUtils.showErros(resp); return false; }
  //     }, (err) => {
  //       console.log(Object.keys(err));
  //       console.log(err.err);
  //     });
  // }


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

  // loginForm: FormGroup;
  // submitted = false;
  // error = '';
  // items: any = [];
  stores: any = [];
  // img: any;
  // show: boolean = false;
  // current: boolean = false;
  // id: string = null;
  // public obsuser: Subscription
  // load = false;
  showsearch: boolean = false
  // selectedItem: number;

  selectedStores: any = [];
  selectedVendors: any = [];
  code: any = '';

  public filters: any = {
    vendors: '',
    stores: '',
    code: '',
    date: ''
  }
  users: any;
  param: any = null;


  constructor(
    public toastEvent: ToastService,
    public _userc: UserService,
    private _user: userService,
    private _inventory: inventoryService,
    private _element: elementService,
    private route: ActivatedRoute,
    private _obs: ObservablesService,
    private router: Router) { }

  ngOnInit() {
    this.getStores()

    let id = this.route.snapshot.paramMap.get('id')

    if (id) this.param = [id];
    if (!id) this.param = 0;

    console.log(this.param);

    this.filters = {
      vendors: this.param,
      stores: [this.selectedStores],
      code: this.code,
      date: ''
    }

    this.getData()

  }

  // this._obs.obsuser.subscribe(arg => {
  //   document.cookie = "current=" + arg
  //   this.filters = {
  //     vendors: [arg],
  //     stores: [this.selectedStores],
  //     code: this.code,
  //     date: ''
  //   }
  // }
  // )

  // this._obs.obsuser.subscribe((id) => console.log(id);)

  // this.route.queryParams
  //   .subscribe((params: any) => {
  //     console.log(params.id);
  //     document.cookie = "current=" + params.id
  //     this.filters = {
  //       vendors: [params.id],
  //       stores: [this.selectedStores],
  //       code: this.code,
  //       date: ''
  //     }
  //     this.getData()
  //   }
  //   );
  // }


  async getData() {

    this.load = true
    this.show = true

    this._inventory.alls(this.filters)
      .subscribe(resp => {

        this.items = resp.data
        this.items.forEach(element => {
          element.show = false
        });
        this.markAsRead(this.id)
        this.load = false
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

  filterInventories() {
    this.filters = {
      vendors: this.param,
      stores: [this.selectedStores],
      code: this.code,
      date: ''
    }

    this.getData()
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
