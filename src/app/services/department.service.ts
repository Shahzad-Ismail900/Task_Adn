import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ApiResponse>(`${environment.url}/Department/`);
    // return this.http.get<any>(`${environment.url}/Department/`);
  }

  getDeptById(key:number) {
    return this.http.get<ApiResponse>(`${environment.url}/Department/${key}/detail`);
  }

  save(request: any) {
    return this.http.post<ApiResponse>(`${environment.url}/Department/`, request);
  }

  delete(key:number) {
    return this.http.delete<ApiResponse>(`${environment.url}/Department/${key}/delete`);
  }


}
