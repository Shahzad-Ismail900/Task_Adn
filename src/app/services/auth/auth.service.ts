import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsLoggedIn: boolean = false;
  constructor() { }

  StoreCredientials(token: string, Id: string) {
    let obj = { token: token, userId: Id };
    localStorage.setItem("Credientials", JSON.stringify(obj));

  }

  getToken() {
    let obj: any = localStorage.getItem("Credientials");
    if (obj != null) {
      let token = JSON.parse(obj)
      return token.token;
    }
    else return "";
    //  return;
  }
}
