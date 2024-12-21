import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { TokenRequest } from '../interfaces/tokenRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = 'api/auth';

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<TokenRequest> {
    return this.httpClient.post<TokenRequest>(`${this.pathService}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<TokenRequest> {
    return this.httpClient.post<TokenRequest>(`${this.pathService}/login`, loginRequest);
  }

  public me(token: String): Observable<SessionInformation> {
    return this.httpClient.post<SessionInformation>(`${this.pathService}/me`, token);
  }
}
