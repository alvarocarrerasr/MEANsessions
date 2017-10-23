import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  loginDetails = {
    username: 'prueba',
    password: 'password'
  };
  private http: HttpClient;
  private router: Router;
  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }

  ngOnInit() {
    const token = window.localStorage.getItem('token');
    if (token === 'undefined' || token === null) {
      return;
    }
    this.http.get('http://localhost:3789/login').subscribe((res: Response) => {
      // tslint:disable-next-line:curly
      if (res.status === 200) this.router.navigateByUrl('/app');
    });
  }

  onLoginClicked() {

    localStorage.setItem('token', 'undefined');
    this.http.post('http://localhost:3789/login',
      {
        usernameLogin: this.loginDetails.username,
        passwordLogin: this.loginDetails.password
      }).subscribe((res: {token}) => {
        window.localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/app');
      });
}

}
