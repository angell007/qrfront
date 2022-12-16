import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Globales } from '../../../shared/globales/globales';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class userService {

  private _rutaBase: string = environment.base_url;

  constructor(private client: HttpClient,
  ) { }

  register(data: FormData): Observable<any> {
    return this.client.post(this._rutaBase + '/users/register', data);
  }

  index(): Observable<any> {
    return this.client.get(this._rutaBase + '/users/index');
  }

  myowners(id): Observable<any> {
    return this.client.get(this._rutaBase + '/users/myowners/' + id);
  }




  getexcel(id): Observable<any> {

    var HTTPOptions = {
      headers: new HttpHeaders({ 'Accept': '*/*; charset=UTF-8', }),
      observe: "response" as 'body',// to display the full response & as 'body' for type cast
      'responseType': 'blob' as 'json'
    }

    return this.client.get(this._rutaBase + '/inventory/export?id=' + id, HTTPOptions);
    // return this.client.get(this._rutaBase + '/inventory/export?id=' + id, { responseType: 'arraybuffer' });
  }

}
