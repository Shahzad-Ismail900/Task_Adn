import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ApiResponse>(`${environment.url}/Employee/`);
   
  }

  getEmpById(key:number) {
    return this.http.get<ApiResponse>(`${environment.url}/Employee/${key}/detail`);
  }

  save(request: any) {
    return this.http.post<ApiResponse>(`${environment.url}/Employee/`, request);
  }

  delete(key:number) {
    return this.http.delete<ApiResponse>(`${environment.url}/Employee/${key}/delete`);
  }

  getemployeeType() {
    return this.http.get<ApiResponse>(`${environment.url}/Employee/employeeType`);
   
  }
  getemployeeStatus() {
    return this.http.get<ApiResponse>(`${environment.url}/Employee/employeeStatus`);
   
  }

}

