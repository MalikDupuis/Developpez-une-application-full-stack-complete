import { Component, Input, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-article',
  standalone:true,
  templateUrl: './article.component.html',
  imports: [MatCardModule],
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {

  @Input() date!: string;
  @Input() content!: string;
  @Input() author!: string;
  @Input() title!: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
