import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "../services/session.service";
import { map, take } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UnauthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Souscrire à l'observable isLogged$ et retourner une valeur booléenne
    return this.sessionService.isLogged$.pipe(
      take(1), // Prendre la première valeur et se désabonner immédiatement
      map(isLogged => {
        if (isLogged) {
          // Si l'utilisateur est déjà connecté, on le redirige vers la page d'accueil (ou une autre page)
          this.router.navigate(['/']);
          return false; // Empêche l'accès à la route
        }
        return true; // Permet l'accès à la route
      })
    );
  }
}
