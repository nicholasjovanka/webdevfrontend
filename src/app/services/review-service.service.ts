import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Login} from '../Interfaces/login';
import {BehaviorSubject, from, Observable, Subscription, throwError} from 'rxjs';
import { of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../Interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  fetchdetails: BehaviorSubject<any> = new BehaviorSubject<any>('none');
  constructor(private http: HttpClient) {
  }
  addeditreview(form) {
    return this.http.post('http://localhost:8000/api/addeditreview', form);
  }

  getspecificuser(id) {
    return this.http.get('http://localhost:8000/api/getspecificuserreview/' + id);
  }
  getfivelatestreview(): Observable<any> {
    return this.fetchdetails;
    // return this.http.get('http://localhost:8000/api/getfiveReview/' + id);
  }

  ScrollThroughReview(id, page= 1) {
    const param = new HttpParams().set('page', String(page));
    this.http.get('http://localhost:8000/api/getfiveReview/' + id + '?', {params: param}).toPromise().then(
      res => {this.fetchdetails.next(res); }
    );
  }
  getgamereview(id) {
    return this.http.get('http://localhost:8000/api/getallreview/' + id);
  }

  getWebsiteScore(id) {
    return this.http.get('http://localhost:8000/api/calculateScore/' + id);
  }
  deleteReviewAdmin(id, gameid) {
    return this.http.delete('http://localhost:8000/api/deletereviewadmin/' + id + '/' + gameid);
  }
  deleteuserReview(gameid) {
    return this.http.delete('http://localhost:8000/api/deletereviewuser/' + gameid);
  }
}
