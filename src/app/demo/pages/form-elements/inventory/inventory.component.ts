import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inventoryService } from 'src/app/services/inventory.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { Html5QrcodeScanner } from "html5-qrcode"

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode"
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {

  ModelForm: FormGroup;
  submitted = false;
  error = '';


  selectedItem: number;
  items: any
  elements: any
  store: any

  created_at: any
  updated_at: any
  show: boolean = false

  inventario: any = [];


  title = 'qr-reader';
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled = false;
  public results: string[] = [];
  public flag = false
  public reread = false
  element: string = "iniciando...";
  showInv: any;

  constructor(private formBuilder: FormBuilder, private _inventory: inventoryService) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this._inventory.stores()
      .subscribe(resp => {
        this.items = resp.data
        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

  getLast() {
    console.log(this.selectedItem);
    this._inventory.last(this.selectedItem)
      .subscribe(resp => {


        if (!resp.data) {
          this.showInv = true;
          Swal.fire('Success', 'Sin inventario previo', 'success');
          return false;
        }

        this.elements = resp.data.elements
        this.store = resp.data.store
        this.created_at = resp.data.created_at
        this.updated_at = resp.data.updated_at
        this.show = true

        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }



  camerasFoundHandler(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;
    this.selectCamera(this.cameras[0].label);
  }



  async scanSuccessHandler(event: string) {

    this.element = event
    this.reread = false

    const promise = new Promise<number>((resolve, reject) => {
      resolve(this.inventario.forEach(element => {
        if (element.qr == event) {
          element.quantity += 1;
          this.flag = true
          this.reread = true
        }
      }))
    })

    await promise.then(() => {
      this.getDataElement(event)
    }).finally(() => {
      this.flag = false
      this.results.unshift(event);
    });


  }

  selectCamera(cameraLabel: string) {
    this.cameras.forEach(camera => {
      if (camera.label.includes(cameraLabel)) {
        this.myDevice = camera;
        console.log(camera.label);
        this.scannerEnabled = true;
      }
    })
  }


  async getDataElement(event) {

    if (!this.flag) {
      this.reread = false
      this._inventory.getElement(event)
        .subscribe(resp => {
          console.log(resp.data);
          this.inventario.push({
            "quantity": 1,
            "qr": event,
            "name": resp.data.name,
            "reference": resp.data.reference,
            "img": environment.base_media + 'stores/' + event + '.png',

          })
          if (resp.err) { functionsUtils.showErros(resp); return false; }
        }, (err) => {
          console.log(Object.keys(err));
          console.log(err.err);
        });
    }


  }


  sendInventory() {
    this.submitted = true;
    this._inventory.register({ "items": this.inventario }, this.selectedItem)
      .subscribe(resp => {
        if (resp.err) { functionsUtils.showErros(resp); return false; }
        Swal.fire('Success', 'Operación realizada correctamente', 'success');
        this.inventario = []
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

}
