import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';
import { ICrud } from '../model/crud-interface';
import { ITipoproducto, ITipoproductoPage, ITipoproducto2Send } from '../model/tipoproducto-interfaces';

@Injectable({
  providedIn: 'root',
})

export class TipoproductoService implements ICrud {
  constructor(private http: HttpClient) { }

  sURL = API_URL + '/tipoproducto';

  getPage(page: number, rpp: number, order: string, direction: string, filter: string): Observable<ITipoproductoPage> {
    let strUrl: string = '';
    if (filter) {
      strUrl += '&filter=' + filter;
    }
    if (order) {
      strUrl += '&sort=' + order + ',' + direction;
    }
    return this.http.get<ITipoproductoPage>(
      this.sURL + '/?page=' + (page - 1) + '&size=' + rpp + strUrl, httpOptions);
  }

  getOne(id: number): Observable<ITipoproducto> {
    return this.http.get<ITipoproducto>(this.sURL + '/' + id, httpOptions);
  }

  newOne(oTipoProducto: ITipoproducto2Send): Observable<ITipoproducto> {
    return this.http.post<ITipoproducto>(this.sURL + '/', oTipoProducto, httpOptions);
  }

  updateOne(oTipoProducto: ITipoproducto2Send): Observable<ITipoproducto> {
    return this.http.put<ITipoproducto>(this.sURL + '/', oTipoProducto, httpOptions);
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + '/' + id, httpOptions);
  }

}
