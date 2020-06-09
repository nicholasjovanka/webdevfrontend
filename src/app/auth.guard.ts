import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {LoginRegisterService} from './services/login-register.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: LoginRegisterService, private router: Router) {
  }
  canActivate(): Observable<boolean>|boolean {
    return this.authservice.isUserLoggedIn().pipe(map(res => {
      if (res === 0) {
        return false;
      } else {
        return true;
      }
    }));
  }
}
