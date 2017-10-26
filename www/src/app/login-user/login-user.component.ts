import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';


interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

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
    this.router.navigateByUrl('/app');
  }

  onLoginClicked(usernameIpt: HTMLInputElement, passIpt: HTMLInputElement) {

    localStorage.clear();
    localStorage.setItem('token', 'null');

    this.http.post<LoginResponse>('http://localhost:3789/login',
      {
        usernameLogin: usernameIpt.value,
        passwordLogin: passIpt.value
      }).subscribe(ok => {
        console.log('ok', ok);
        window.localStorage.setItem('token', ok.token);
        this.router.navigateByUrl('/app');
      },
      (err: HttpErrorResponse) => {
        switch (err.status) {
          case 403:
            alert('Username/password invalid');
            break;
          case 0:
            alert('Server seems to be offline. Please retry later or contact system admin');
            break;
          default:
            alert('Undefined error. Please retry later');
            console.log(err);
        }
      }
    );
}

}
