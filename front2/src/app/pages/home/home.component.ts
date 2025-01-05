import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[CommonModule, RouterModule],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
