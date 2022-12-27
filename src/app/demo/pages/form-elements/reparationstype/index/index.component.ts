import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from 'src/app/services/crud.service';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  items: any;
  show: boolean = false;
  img: string;
  closeResult = '';

  constructor(
    private _crud: CrudService,
    private router: Router,
    public toastEvent: ToastService,
    private modalService: NgbModal
  ) { this._crud.model = 'stores' }


  ngOnInit() {
    this.getData()
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getData() {
    this._crud.index()
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
    this.toastEvent.toast({ uid: 'toastRight2', delay: 2000 })
    this._crud.delete(item.id)
      .subscribe(resp => {
        item.status = (item.status == 1) ? 0 : 1
        if (resp.err) { functionsUtils.showErros(resp); return false; }
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

  goEdit(id) {
    this.router.navigate(['/dashboard/store/resource/update'], { queryParams: { hash: id } });
  }

}
