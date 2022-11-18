import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {


  currTime: number;

  constructor() { }

  obsTimer: Observable<number> = timer(0, 30000);

  ngOnInit() {

    this.obsTimer.subscribe(currTime => console.log(currTime));

    // ngOnChanges(changes: SimpleChanges) {
    //   console.log('change detected');
    // }

  }
}
