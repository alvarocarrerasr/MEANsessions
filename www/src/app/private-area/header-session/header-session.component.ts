import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-session',
  templateUrl: './header-session.component.html',
  styleUrls: ['./header-session.component.css']
})
export class HeaderSessionComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
  }
  onLogoutClicked() {
    this.http.get('http://localhost:3789/logout').subscribe();
    localStorage.clear();
    this.router.navigateByUrl('');
  }

}
