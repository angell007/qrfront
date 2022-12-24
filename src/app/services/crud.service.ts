import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _rutaBase: string = environment.base_url;
  model: string;
  httpClient: HttpClient;

  constructor(private client: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler)
  }

  register(data: FormData): Observable<any> {
    return this.client.post(this._rutaBase + '/' + this.model + '/register', data);
  }

  update(data: FormData): Observable<any> {
    return this.client.post(this._rutaBase + '/' + this.model + '/update', data);
  }

  getData(id: number): Observable<any> {
    console.log(id);
    return this.client.post(this._rutaBase + '/' + this.model + '/getdata', { id: id });
  }

  index(): Observable<any> {
    return this.client.get(this._rutaBase + '/' + this.model + '/index');
  }

  delete(id: number): Observable<any> {
    return this.client.delete(this._rutaBase + '/' + this.model + '/' + id);
  }

  sendRegiserWithFile(data: FormData): Observable<any> {
    return this.httpClient.post(this._rutaBase + '/' + this.model + '/register', data);
  }

  sendUpdateWithFile(data: FormData): Observable<any> {
    return this.httpClient.post(this._rutaBase + '/' + this.model + '/update', data);
  }

}
