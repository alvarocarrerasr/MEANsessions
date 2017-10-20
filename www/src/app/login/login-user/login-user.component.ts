import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  loginDetails = {
    username : 'prueba',
    password: 'password'
  };
  private http: Http;
  private router: Router;
  constructor(http: Http, router: Router) {
    this.http = http;
    this.router = router;
  }

  ngOnInit() {
    this.http.get('http://localhost:3789/login',
     {withCredentials: true}).subscribe((res: Response) => {
        var user = JSON.parse(res.text());
        if (user) {
          this.router.navigateByUrl('/app');
        }
    });
  }

  onLoginClicked() {
    this.http.post('http://localhost:3789/login',
    {
      usernameLogin: this.loginDetails.username,
      passwordLogin: this.loginDetails.password
    }, {withCredentials: true}).subscribe((res: Response) => {
        this.router.navigateByUrl('/app');
    });
  }

}
