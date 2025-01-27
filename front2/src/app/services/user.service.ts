import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ProfilRequest } from '../interfaces/profilRequest.interface';
import { MessageResponse } from '../interfaces/messageResponse.interface';
import { TokenRequest } from '../interfaces/tokenRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private pathService = 'api/user';

  constructor(private httpClient: HttpClient) {
  }

  public update(profilRequest: ProfilRequest): Observable<TokenRequest> {
    return this.httpClient.put<TokenRequest>(`${this.pathService}`, profilRequest);
  }


}
