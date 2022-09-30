import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EDMSApp';

  /**
   *
   */
  constructor(private _route: Router,public _login:LoginService) {
    //

  }

  Logout() {
    localStorage.clear();
    this._login.IsLogin = false;
    this._route.navigate(['/login']);
  }
}
