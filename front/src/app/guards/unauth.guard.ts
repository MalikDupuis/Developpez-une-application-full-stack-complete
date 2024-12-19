import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router"; 
import { SessionService } from "../services/session.service";

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {

  constructor( 
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  public canActivate(): boolean {
    console.log(this.sessionService.isLogged$)
    if (this.sessionService.isLogged$) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}