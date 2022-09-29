import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor() { }

  getToken() {
    let obj: any = localStorage.getItem("Credientials");
    if (obj != null) {
      let token = JSON.parse(obj)
      return token.token;
    }
    else return "";
  
  }
  getUserId() {
    let obj: any = localStorage.getItem("Credientials");
    if (obj != null) {
      let token = JSON.parse(obj)
      return token.userId;
    }
    else return "";
  
  }
}
