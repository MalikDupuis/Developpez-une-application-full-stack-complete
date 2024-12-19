import { Component, Input, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {

  @Input() date!: string;
  @Input() content!: string;
  @Input() author!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
