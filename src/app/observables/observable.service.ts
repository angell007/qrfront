import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ObservablesService {

    @Injectable({
        providedIn: 'root'
    })
    // public obsuser: Observable<any> = new Observable();
    public obsuser = new Subject<any>();
    public points = new Subject<any>();
    constructor() { }
}