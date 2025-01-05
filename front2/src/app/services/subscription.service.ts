import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionRequest } from '../interfaces/subscriptionRequest.interface';
import { Theme } from '../interfaces/theme.interface';
import { SubscriptionResponse } from '../interfaces/SubscriptionResponse.interface';

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

  public unSubscribe(subscriptionId: number): Observable<void> {
    console.log("service")
    return this.httpClient.delete<void>(`${this.pathService}/${subscriptionId}`,);
  }

  public getMy(userId: number): Observable<SubscriptionResponse[]> {
      return this.httpClient.get<SubscriptionResponse[]>(`${this.pathService}/${userId}`);
    }

}
