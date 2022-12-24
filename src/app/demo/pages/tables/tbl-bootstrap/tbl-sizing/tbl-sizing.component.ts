import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tbl-sizing',
  templateUrl: './tbl-sizing.component.html',
  styleUrls: ['./tbl-sizing.component.scss']
})
export class TblSizingComponent implements OnInit {

  public users: any
  public show: boolean = false

  constructor(private _user: userService, private router: Router) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this._user.index()
      .subscribe(resp => {
        this.users = resp.data
        this.show = true
        // if (resp.err) { functionsUtils.showErros(resp); return false; }
        // Swal.fire('Success', 'Operación realizada correctamente', 'success');
        // this.cleanForm()
      }, (err) => {
        console.log(Object.keys(err));
        console.log(err.err);
      });
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
