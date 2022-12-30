import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Globales } from '../../../shared/globales/globales';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class storeService {

    private _rutaBase: string = environment.base_url;

    constructor(private client: HttpClient,
    ) { }
    register(data: FormData): Observable<any> {
        return this.client.post(this._rutaBase + '/stores/register', data);
    }
    // index(): Observable<any> {
    //     return this.client.get(this._rutaBase + '/stores/index');
    // }

    index(parameters = {}): Observable<any> {
        // let params = new HttpParams().set(parameters);
        return this.client.get(this._rutaBase + '/stores/index', { params: parameters });
    }


    getpdflist(id): Observable<any> {
        var HTTPOptions = {
            headers: new HttpHeaders({ 'Accept': '*/*; charset=UTF-8', }),
            observe: "response" as 'body',// to display the full response & as 'body' for type cast
            'responseType': 'blob' as 'json'
        }

        return this.client.get(this._rutaBase + '/stores/pdfdownload/' + id, HTTPOptions);
    }
}
