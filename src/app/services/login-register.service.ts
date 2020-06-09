import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Login} from '../Interfaces/login';
import {BehaviorSubject, from, Observable, Subscription, throwError} from 'rxjs';
import { of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  constructor(private http: HttpClient) { }
  urlregister = 'http://localhost:8000/api/register';
  urllogin = 'http://localhost:8000/api/login';
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  fetchpicture: BehaviorSubject<any> = new BehaviorSubject<any>('none');
  fetchdetails: BehaviorSubject<any> = new BehaviorSubject<any>('none');
  curentstate: boolean;
  HttpOption: HttpHeaders;

  private registerError(error: HttpErrorResponse) {
    if (error.error.error.email) {
      return throwError(error.error.error.email[0]);
    } else if (error.error.error.name) {
      return throwError(error.error.error.name[0]);
    } else if (error.error.error) {
      return throwError(error.error.error);
    } else {
      return throwError(error.status);
    }
  }


  private isLoggedInError(error: HttpErrorResponse) {
      return of(false);
  }

  public isUserLoggedIn() {
    return this.http.get<any>('http://localhost:8000/api/isLoggedIn').pipe(catchError(this.isLoggedInError));
  }
  private editProfileError(error: HttpErrorResponse) {
    if (error.error.error) {
      return throwError(error.error.error.email[0]);
    } else if (error.error.error.name) {
      return throwError(error.error.error.name[0]);
    } else {
      return throwError(error);
    }
  }
  isAdmin() {
    return this.http.get<any>('http://localhost:8000/api/isAdmin');
  }
  register(form) {
    return this.http.post<any>(this.urlregister, form).pipe(catchError(this.registerError));
  }

  login(form) {
    return this.http.post<Login>(this.urllogin, form);
  }

  Login() {
    this.curentstate = sessionStorage.getItem('loginState') === 'true' ? true : false;
    if (this.curentstate === true) {
      this.isLoggedIn.next(true);
    } else if (this.curentstate === false) {
       this.isLoggedIn.next(false);
       this.fetchpicture.next('none');
     }
  }
  getLoginStatus(): Observable<boolean> {
    return this.isLoggedIn;
  }

  // Picture Related
  getPicture(): Observable<any> {
    return this.fetchpicture;
  }

  getUserProfilePicture() {
    // this.HttpOption = new HttpHeaders({
    //   Accept: '',
    //   Authorization : sessionStorage.getItem('token') ? 'Bearer ' + sessionStorage.getItem('token').toString() : null
    // });
    // return this.http.get<any>(this.urlgetimage, {headers: this.HttpOption, responseType: 'blob'});
    if (!!sessionStorage.getItem('token')) {
      // @ts-ignore
      this.http.get<any>('http://localhost:8000/api/getimage', { responseType: 'blob'}).subscribe(
        res => { this.fetchpicture.next(res); }
      );
  }
}
  getDetails(): Observable<User> {
    return this.fetchdetails;
  }
  getUserDetails() {
    return this.http.get<User>('http://localhost:8000/api/getdetail').subscribe(
      res => this.fetchdetails.next(res)
    );
}
  UpdateProfile(form) {
    return this.http.post<any>('http://localhost:8000/api/updateuserprofile', form,
      ).pipe(catchError(this.registerError));
  }
}
