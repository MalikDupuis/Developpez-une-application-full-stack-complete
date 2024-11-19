import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { TokenRequest } from '../interfaces/tokenRequest.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  private sessionInfoSubject = new BehaviorSubject<SessionInformation | null>(null);

  public isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();
  public sessionInformation$: Observable<SessionInformation | null> = this.sessionInfoSubject.asObservable();

  constructor(private authService: AuthService) {
    const token = localStorage.getItem('jwtKey');
    if (token) {
      this.authService.me(token).pipe(
        catchError(() => {
          // En cas d'échec, déconnecter l'utilisateur
          this.logOut();
          return [];
        })
      ).subscribe((userInfo: SessionInformation) => {
        if (userInfo) {
          this.sessionInfoSubject.next(userInfo);
          this.isLoggedSubject.next(true);
        }
      });
    }
  }

  public logIn(token: TokenRequest): void {
    
    localStorage.setItem('jwtKey', token.token);
    
  }

  public logOut(): void {
    this.sessionInfoSubject.next(null);
    localStorage.removeItem('jwtKey');
    this.isLoggedSubject.next(false);
  }
}
