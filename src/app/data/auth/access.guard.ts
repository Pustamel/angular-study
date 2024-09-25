import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

export function canActivateAuth() {
    const isLogged = inject(AuthService).isAuth

    if(isLogged) return true

    return inject(Router).createUrlTree(['/login'])
}
