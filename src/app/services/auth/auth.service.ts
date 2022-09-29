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
}
