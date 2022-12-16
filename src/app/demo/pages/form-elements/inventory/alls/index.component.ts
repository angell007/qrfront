import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservablesService } from 'src/app/observables/observable.service';
import { inventoryService } from 'src/app/services/inventory.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-inventory-all-index',
    templateUrl: './index.component.html',
})
export class allIndexComponent implements OnInit {


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

        this.getData()


    }

    async getData() {

        this.load = true
        this.show = true

        this._inventory.alls()
            .subscribe(resp => {
                this.items = resp.data
                console.log(this.items);
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

}
