import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  }
  onLogoutClicked() {
    this.http.get('http://localhost:3789/logout').subscribe();
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

}
