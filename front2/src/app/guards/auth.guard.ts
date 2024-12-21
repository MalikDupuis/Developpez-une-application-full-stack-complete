import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { SessionService } from "../services/session.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) { }

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Souscrire à l'observable isLogged$ et retourner une valeur booléenne
    return this.sessionService.isLogged$.pipe(
      take(1), // Prendre la première valeur et se désabonner immédiatement
      map(isLogged => {
        console.error(isLogged)
        if (!isLogged) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      })
    );
  }
}
