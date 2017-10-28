import { Component,  AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUserData } from './UserData.model';

@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css']
})
export class PrivateAreaComponent implements OnInit {

  private http: HttpClient;
  private router: Router;
  private userData: IUserData;

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }
  ngOnInit() {
    this.http.get<IUserData>('http://localhost:3789/login').subscribe(
      ok => {
        this.userData = ok;
      },
      (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.router.navigateByUrl('');
        }
      }
    );
  }

}
