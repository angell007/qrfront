import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    index(parameters = {}): Observable<any> {
        // let params = new HttpParams().set(parameters);
        return this.client.get(this._rutaBase + '/elements/index', { params: parameters });
    }

    changuestatus(parameters = {}): Observable<any> {
        // let params = new HttpParams().set(parameters);
        return this.client.get(this._rutaBase + '/elements/changuestatus', { params: parameters });
    }

    getpdflist(id): Observable<any> {
        var HTTPOptions = {
            headers: new HttpHeaders({ 'Accept': '*/*; charset=UTF-8', }),
            observe: "response" as 'body',// to display the full response & as 'body' for type cast
            'responseType': 'blob' as 'json'
        }

        return this.client.get(this._rutaBase + '/elements/pdfdownload/' + id, HTTPOptions);
    }

}
