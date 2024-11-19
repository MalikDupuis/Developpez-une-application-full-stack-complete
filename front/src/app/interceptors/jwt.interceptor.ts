import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('jwtKey')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('jwtKey')}`,
        },
      });
    }
    return next.handle(request);
  }
}
