import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  // get All Data
  getRestaurant() {
    return this._http.get('http://localhost:3000/posts').pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }

  // Post Data
  postRestaurant(data: any) {
    return this._http.post('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // update data
  updateRestaurant(data: any, id: number) {
    return this._http.put('http://localhost:3000/posts/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // delete data
  deleteRestaurant(id: number) {
    return this._http.delete('http://localhost:3000/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
