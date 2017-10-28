import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { HeaderSessionComponent } from './private-area/header-session/header-session.component';
import { HomeComponent } from './home/home.component';
import { PrivateAreaComponent } from './private-area/private-area.component';
import { HttpsRequestInterceptor } from './InterceptorHTTP.module';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'app', component: PrivateAreaComponent}
];




@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    HeaderSessionComponent,
    HomeComponent,
    PrivateAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
