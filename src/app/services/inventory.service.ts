import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Globales } from '../../../shared/globales/globales';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class inventoryService {

    private _rutaBase: string = environment.base_url;

    constructor(private client: HttpClient,
    ) { }



    register(data, id, action): Observable<any> {
        return this.client.post(this._rutaBase + '/inventory/' + action + '/' + id, data);
    }

    index(): Observable<any> {
        return this.client.get(this._rutaBase + '/inventory/index');
    }

    stores(): Observable<any> {
        return this.client.get(this._rutaBase + '/inventory/stores');
    }

    last(store: Number): Observable<any> {
        return this.client.get(this._rutaBase + '/inventory/last/' + store);
    }

    getunread(): Observable<any> {
        return this.client.get(this._rutaBase + '/inventory/unreaded');
    }

    getElement(qr: String): Observable<any> {
        return this.client.get(this._rutaBase + '/inventory/get_element/' + qr);
    }
    owners(id: String): Observable<any> {
        return this.client.get(this._rutaBase + '/inventory/owners/' + id);
    }

    markAsRead(id: String): Observable<any> {
        return this.client.get(this._rutaBase + '/inventory/markasread/' + id);
    }

    changuestatus(id): Observable<any> {
        return this.client.get(this._rutaBase + '/inventory/check/' + id);
    }
    alls(params): Observable<any> {
        return this.client.get(this._rutaBase + '/inventory/alls', { params: params });
    }

}
