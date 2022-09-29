import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login.service';
// import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  LoginForm: FormGroup;
  // 
  constructor(private fb: FormBuilder, private _router: Router,
    private _login: LoginService,
    private _auth: AuthService) {
    this.LoginForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {

  
  }


  IsValid(): boolean {
    return this.LoginForm.valid;
  }
  Login() {
    debugger;
    if (this.IsValid()) {
      let request = this.LoginForm.value;

      this._login.authenticate(request).subscribe(response => {

        if (response.isSucessful) {
          this._login.IsLogin = true;
          let data = response.data;
          this._auth.StoreCredientials(data.token, data.userId);
          this._router.navigate(['/department']);
        }
        else
      alert("Invalid user and password..!");
      });
    }
 

    
  }
}


