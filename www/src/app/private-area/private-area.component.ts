import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css']
})
export class PrivateAreaComponent implements OnInit {
  private http: HttpClient;
  private router: Router;

  constructor(http: HttpClient, router: Router, ) {
    this.http = http;
    this.router = router;
  }
  ngOnInit() {
    this.http.get('http://localhost:3789/login').subscribe(
      ok => {
        console.log(ok);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 403) {
          console.log('Acceso denegado', window.localStorage.getItem('token'));
        }
      }
    );
  }
  onLogoutClicked() {
    this.http.get('http://localhost:3789/logout').subscribe();
    localStorage.clear();
    this.router.navigateByUrl('');
  }

}
