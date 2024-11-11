import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionApiService {

  private pathService = 'api/user';

  constructor(private httpClient: HttpClient) {
  }

  public getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  public detail(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  public create(session: User): Observable<User> {
    return this.httpClient.post<User>(this.pathService, session);
  }

  public update(id: string, session: User): Observable<User> {
    return this.httpClient.put<User>(`${this.pathService}/${id}`, session);
  }

  public participate(id: string, userId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/${id}/participate/${userId}`, null);
  }

  public unParticipate(id: string, userId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.pathService}/${id}/participate/${userId}`);
  }

}
