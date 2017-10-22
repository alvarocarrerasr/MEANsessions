import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { PersistentAPI } from './../../PersistentAPI.service';
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
  private http: Http;
  private router: Router;
  private persistenceAPI: PersistentAPI;
  constructor(http: Http, router: Router, persistenceAPI: PersistentAPI) {
    this.http = http;
    this.router = router;
    this.persistenceAPI = persistenceAPI;
  }

  ngOnInit() {
    const sessionToken = this.persistenceAPI.getSessionToken();
    if (sessionToken === 'null' || sessionToken === 'undefined') {
      return;
    }
    const headers = new Headers({ token: sessionToken });
    this.http.get('http://localhost:3789/login',
      { headers }).subscribe((res: Response) => {
        // tslint:disable-next-line:curly
        if (res.status === 200 ) this.router.navigateByUrl('/app');
      });
  }

  onLoginClicked() {
    this.http.post('http://localhost:3789/login',
      {
        usernameLogin: this.loginDetails.username,
        passwordLogin: this.loginDetails.password
      }).subscribe((res: Response) => {
        this.persistenceAPI.setSessionToken(JSON.parse(res.text()).token);
        this.router.navigateByUrl('/app');
      });
  }

}
