import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { PersistentAPI } from './../PersistentAPI.service';
@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css']
})
export class PrivateAreaComponent implements OnInit {
  private http: Http;
  private router: Router;
  private persistenceAPI: PersistentAPI;
  constructor(http: Http, router: Router, persistenceAPI: PersistentAPI) {
    this.http = http;
    this.router = router;
    this.persistenceAPI = persistenceAPI;
  }
  ngOnInit() {
  }
  onLogoutClicked() {
    const sessionToken = this.persistenceAPI.getSessionToken();
    const headers = new Headers({ token: sessionToken });
    this.persistenceAPI.removeSessionToken();
    this.http.get('http://localhost:3789/logout', { headers }).subscribe();
    this.router.navigateByUrl('');
  }

}
