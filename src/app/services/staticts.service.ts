import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Globales } from '../../../shared/globales/globales';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class statictsService {

  private _rutaBase: string = environment.base_url;

  constructor(private client: HttpClient,
    // private globales: Globales
  ) { }


  public getStatics(): Observable<any> {
    return this.client.get(this._rutaBase + '/inventory/lastest');
  }
  // public getStatics(p: any): Observable<any> {
  //   return this.client.get(this._rutaBase + '/users/register', { params: p });
  // }
  // SaveProducto(data: FormData): Observable<any> {
  //   return this.client.post(environment.ruta + 'php/listaprecioeps/save_producto.php', data);
  // }

}
