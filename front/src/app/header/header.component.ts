import { Component, OnInit } from '@angular/core';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { SessionService } from '../services/session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public sessionInformation$: Observable<SessionInformation | null>;
  
  constructor(private sessionService: SessionService) { 
    this.sessionInformation$ = this.sessionService.sessionInformation$;
  }

  ngOnInit(): void {
    
  }

  public getInfo(){
    console.log(this.sessionService.sessionInformation$)
  }
  

}
