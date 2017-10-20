import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css']
})
export class PrivateAreaComponent implements OnInit {
  private http: Http;
  private router: Router;
  constructor(http: Http, router: Router) {
    this.http = http;
    this.router = router;
  }
  ngOnInit() {
  }
  onLogoutClicked() {
    this.http.get('http://localhost:4200/logout').subscribe((resp: Response) => {
      this.router.navigateByUrl('');
    });
  }

}
