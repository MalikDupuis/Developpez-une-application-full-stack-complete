import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { combineLatest, map, Observable, take } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}

  public canActivate(): Observable<boolean> {
    // Combiner `isInitialized$` et `isLogged$` pour attendre l'initialisation
    return combineLatest([
      this.sessionService.isInitialized$, // Attendre que l'état soit initialisé
      this.sessionService.isLogged$,
    ]).pipe(
      take(1), // Prendre la première combinaison des valeurs
      map(([isInitialized, isLogged]) => {
        console.log('Guard State:', { isInitialized, isLogged });
        if (isInitialized) {
          
          if (!isLogged) {
            
            this.router.navigate(['login']);
            return false;
          }
          return true;
        }
        return false; // Ne pas activer tant que l'état n'est pas initialisé
      })
    );
  }
}
