import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { RegisterService } from './services/register.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private registerService: RegisterService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAuth = this.registerService.getAuth();
        if (!isAuth) this.router.navigate(['/signUp']);
        return isAuth;
    }
}