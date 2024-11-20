import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input() title!: string;
  @Input() description!: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
