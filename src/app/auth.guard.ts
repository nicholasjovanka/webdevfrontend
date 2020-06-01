import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginRegisterService} from './services/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: LoginRegisterService, private router: Router) {
  }
  canActivate(): boolean {
    let state: boolean = false;
    this.authservice.getLoginStatus().subscribe(res => state = res )
    return state;
  }
}
