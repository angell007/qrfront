import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Globales } from '../../../shared/globales/globales';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class elementService {

    private _rutaBase: string = environment.base_url;

    constructor(private client: HttpClient,
    ) { }



    register(data: FormData): Observable<any> {
        return this.client.post(this._rutaBase + '/elements/register', data);
    }

    index(): Observable<any> {
        return this.client.get(this._rutaBase + '/elements/index');
    }

}
