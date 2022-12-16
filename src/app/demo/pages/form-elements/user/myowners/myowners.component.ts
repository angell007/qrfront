import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from 'src/app/services/user.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';

@Component({
  selector: 'app-myowners',
  templateUrl: './myowners.component.html',
  styleUrls: ['./myowners.component.scss']
})
export class MyownersComponent implements OnInit {

  submitted = false;
  error = '';
  items: any = [];
  img: any;
  show: boolean = false;
  current: boolean = false;
  id: string = null;
  load = false;
  user: any;
  constructor(private route: ActivatedRoute, private _user: userService) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe((params: any) => {
        this.getData(params.hash)
      }
      );
  }


  print(id: string) {

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
          <title>Reporte ${this.user.name} </title>
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

            <span> <b> Usuario: </b> ${this.user.name}</span>
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

    this._user.getexcel(id)
      .subscribe(resp => {

        let fileName = 'inventory'

        // const contentDisposition = resp.headers.get('Content-Disposition');
        // if (contentDisposition) {
        //   const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        //   const matches = fileNameRegex.exec(contentDisposition);
        //   if (matches != null && matches[1]) {
        //     fileName = matches[1].replace(/['"]/g, '');
        //   }
        // }

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


  async getData(id) {

    this.load = true
    this.show = true

    this._user.myowners(id)
      .subscribe(resp => {
        this.items = resp.data
        if (this.items.length > 0) this.user = this.items[0].user
        this.load = false
        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

}
