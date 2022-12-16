import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { ObservablesService } from 'src/app/observables/observable.service';
import { inventoryService } from 'src/app/services/inventory.service';
import { functionsUtils } from 'src/app/utils/functionsUtils';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {



  currTime: number;
  data: any = []
  point: 0
  obsuser: any;

  constructor(private _inventory: inventoryService, private router: Router, private _obs: ObservablesService) { }

  obsTimer: Observable<number> = timer(0, 30000);

  ngOnInit() {

    this.obsTimer.subscribe(currTime => {

      this._inventory.getunread()
        .subscribe(resp => {

          this.data = resp.data

          this.point = this.data.length

          this.obsuser = this._obs.points.next(this.point)


          // console.log([resp.data, this.point]);

          if (resp.err) { functionsUtils.showErros(resp); return false; }
        }, (err) => {
          console.log(Object.keys(err));
          console.log(err.err);
        });

    });

    // ngOnChanges(changes: SimpleChanges) {
    //   console.log('change detected');
    // }

  }


  dispachtUser(id: any) {
    this._obs.obsuser.next(id)
    this.router.navigate(['/dashboard/inventories/resource-inventory/index/'], { queryParams: { id: id } });
    // this.router.navigateByUrl('/dashboard/inventories/resource-inventory/index/' + id);
  }




}
