import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { userService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tbl-sizing',
  templateUrl: './tbl-sizing.component.html',
  styleUrls: ['./tbl-sizing.component.scss']
})
export class TblSizingComponent implements OnInit {

  public users: any
  public show: boolean = false

  constructor(private _user: userService, private router: Router,
    private _crud: CrudService,
    public toastEvent: ToastService) {
    this._crud.model = 'users'
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this._user.index()
      .subscribe(resp => {
        this.users = resp.data
        this.show = true
        // if (resp.err) { functionsUtils.showErros(resp); return false; }
        // Swal.fire('Success', 'Well done', 'success');
        // this.cleanForm()
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
  }

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


  goMyInventories(hash) {
    // this.router.navigate(['/dashboard/inventories/resource-inventory/myowners'], { queryParams: { hash: id } });
    // this.router.navigate(['/dashboard/inventories/resource-inventory/myowners'], { queryParams: { hash: id } });
    this.router.navigate(
      ['/dashboard/inventories/resource-inventory/myowners', hash]
    );
  }

  goEdit(id) {
    this.router.navigate(['/dashboard/user/update'], { queryParams: { hash: id } });

  }

}
