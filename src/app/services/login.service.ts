import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  IsLogin:any ;
  constructor(private http: HttpClient) { }

  authenticate(user: any) {
    return this.http.post<ApiResponse>(`${environment.url}/Authentication/authenticate`,user);
   
  }
}
