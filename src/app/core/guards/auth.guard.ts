import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UserService } from "../services/user.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private _user: UserService,
        private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> {
        // console.log('canLoad');
        return this._user.validarToken()
            .pipe(
                tap(estaAutenticado => {
                    if (!estaAutenticado) {
                        this.router.navigateByUrl('/signin-v2');
                    }
                })
            );
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        // console.log('canActive');
        return this._user.validarToken()
            .pipe(
                tap(estaAutenticado => {
                    if (!estaAutenticado) {
                        this.router.navigateByUrl('/signin-v2');
                    }
                })
            );

    }



}