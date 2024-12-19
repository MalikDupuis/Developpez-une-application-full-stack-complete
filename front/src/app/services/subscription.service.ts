import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionRequest } from '../interfaces/subscriptionRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private pathService = 'api/subscription';

  constructor(private httpClient: HttpClient) {
  }

  public subscribe(subscriptionRequest: SubscriptionRequest): Observable<void> {
    console.log("service")
    return this.httpClient.post<void>(`${this.pathService}`, subscriptionRequest);
  }

}
