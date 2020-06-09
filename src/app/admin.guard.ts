import {Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {LoginRegisterService} from './services/login-register.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authservice: LoginRegisterService, private router: Router) {
  }
  canActivate(): Observable <boolean> | boolean {
    return this.authservice.isAdmin().pipe(map(res => {
      if (res === 0) {
        return false;
      } else {
        return true;
      }
    }));
  }
}
