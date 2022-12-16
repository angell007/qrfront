// import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inventoryService } from 'src/app/services/inventory.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { Html5QrcodeScanner } from "html5-qrcode"

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode"
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


import { AngularNotificationService, NotifComponent } from 'angular-notification-alert';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';


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
  elements: any = []
  store: any

  created_at: any
  updated_at: any
  show: boolean = false
  titleTable: string = 'Nuevo Inventario'

  inventario: any = [];


  title = 'qr-reader';
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled = false;
  public results: string[] = [];
  public flag = false
  public reread = false
  element: string = "iniciando...";
  showInv: boolean = false;
  btnText: any = 'Inicio';
  action: string = 'register';
  currentQr: string = null;
  msg: string;
  idSend: number;
  id: number;



  @ViewChild('parent', { read: ViewContainerRef }) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  constructor(

    private Service: AngularNotificationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private _inventory: inventoryService) { }

  ngOnInit() {
    this.getData()
  }

  addNotifElement() {
    let setting = {
      width: '300px',
      type: 'success',
      // title: ' <i> Ok <i>  ',
      body: '<b><p style="color:black">Elemento leido correctamente <p></b>',
      position: 'center',
      duration: 1000,
      background: '#FFF'
    };
    this.Service.setProperties(setting);
    const childComponent = this.componentFactoryResolver.resolveComponentFactory(NotifComponent);
    this.componentRef = this.target.createComponent(childComponent);
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

    if (!this.selectedItem) {
      Swal.fire('warning', 'Debes seleccionar un estante', 'warning');
      return false;
    }

    this.showInv = false;
    this.elements = []
    this.btnText = 'Loading...';
    this.idSend = this.selectedItem


    this._inventory.last(this.selectedItem)
      .subscribe(resp => {
        this.showInv = true;
        this.btnText = 'Inicio';

        if (!resp.data) {
          Swal.fire('Success', 'Sin inventario previo', 'success');
          return false;
        }

        this.elements = resp.data.elements
        this.store = resp.data.store
        this.created_at = resp.data.created_at
        this.updated_at = resp.data.updated_at
        this.show = true
        this.id = resp.data.id

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

    this.msg = 'scanning...'

    console.log('scanning...');

    if (event == this.currentQr) {
      this.reread = true
      this.msg = ''
      this.addNotifElement()
      return false
    }

    if (event != this.currentQr) this.currentQr = event

    this.element = event
    this.reread = false

    this.filter(event).then(async (bool) => await this.getDataElement(bool, event)).finally(() => {
      this.flag = false
      this.results.unshift(event);
      this.addNotifElement();
    });
  }

  filter = async (event: string) => {
    return await this.inventario.some((element) => {
      return element.qr == event;
    });
  }



  msgshow() {
    // Swal.fire({
    //   title: 'Elemento Leido!',
    //   text: 'El elemento ya ha sido agregado.',
    //   icon: 'success',
    //   position: 'bottom',
    //   showConfirmButton: false,
    //   timer: 1000
    // });

  }

  async getDataElement(flag, event) {

    if (!flag) {
      this.reread = false
      this._inventory.getElement(event)
        .subscribe(resp => {
          console.log(resp.data);
          this.inventario.push({
            "quantity": 1,
            "qr": event,
            "name": resp.data.name,
            "reference": resp.data.reference,
            "img": environment.base_media + 'items/' + event + '.png',

          })
          this.msg = ''
          if (resp.err) { functionsUtils.showErros(resp); return false; }
        }, (err) => {
          console.log(Object.keys(err));
          console.log(err.err);
        });
    }

    if (flag) {
      this.flag = true
      this.reread = true
      this.msg = ''
    }

  }


  editInventory() {
    this.msg = ''
    this.inventario = []
    this.action = 'edit'
    this.titleTable = "Actualizando Ultimo inventario";
    this.elements.forEach(element => {
      if (element.quantities.quantity) {
        this.inventario.push({
          "quantity": element.quantities.quantity,
          "qr": element.qr,
          "name": element.name,
          "reference": element.reference,
          "img": environment.base_media + 'items/' + element.qr + '.png',
        })
      }
    });

    this.idSend = this.id
    this.reread = false
  }

  newInventory() {
    this.msg = ''
    this.action = 'register'
    this.titleTable = "Nuevo Inventario";
    this.inventario = []
    this.reread = false
    this.currentQr = null
    this.idSend = this.selectedItem
  }

  sendInventory() {
    this.submitted = true;
    this._inventory.register({ "items": this.inventario }, this.idSend, this.action)
      .subscribe(resp => {
        if (resp.err) { functionsUtils.showErros(resp); return false; }
        this.newInventory()
        this.getLast()
        Swal.fire('Success', 'Operación realizada correctamente', 'success');
        this.inventario = []
        this.submitted = false;
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

}
