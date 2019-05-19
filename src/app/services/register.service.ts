import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private isAuthenticated: boolean = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private errorMsgSignUp = new Subject<string>();
  private errorMsgLogin = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) { }


  getToken() {
    return this.token;
  }
  getErrorSignUp() {
    return this.errorMsgSignUp.asObservable();
  }
  getErrorLogin() {
    return this.errorMsgLogin.asObservable();
  }

  getAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  signUp(form) {
    return this.http.post('https://api.tsetab.com/api/Users/Register', form, this.httpOptions)
      .subscribe(res => {
        console.log("register successfully.");
      }, error => {
        this.errorMsgSignUp.next(error.error.message)
      })
  }
  signIn(form) {
    return this.http.post('https://api.tsetab.com/api/Users/Authenticate', JSON.stringify(form), this.httpOptions)
      .subscribe(res => {
        this.token = res['token'];
        if (this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(this.token);
          this.errorMsgLogin.next(null);
          this.router.navigate(['/home']);
        }
      }, error => {
        this.errorMsgLogin.next(error.error.message)
      })
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuth();
    this.router.navigate(['/signUp']);
  }

  authAutoUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) return;
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  private saveAuthData(token: string) {
    localStorage.setItem("token", token);
  }

  private clearAuth() {
    localStorage.removeItem("token");
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return { token: token };
  }
}
