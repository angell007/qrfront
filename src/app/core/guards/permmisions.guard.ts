import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UserService } from "../services/user.service";


@Injectable({
    providedIn: 'root'
})
export class PermissionsGuard implements CanActivate, CanLoad {

    constructor(private _user: UserService,
        private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> {
        return this._user.validarPermission()
            .pipe(
                tap(isallow => {
                    if (!isallow) {
                        this.router.navigateByUrl('/dashboard/default');
                    }
                })
            );
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this._user.validarPermission()
            .pipe(
                tap(isallow => {
                    if (!isallow) {
                        this.router.navigateByUrl('/dashboard/default');
                    }
                })
            );

    }



}