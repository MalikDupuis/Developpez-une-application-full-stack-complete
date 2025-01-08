import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-article',
  standalone:true,
  templateUrl: './article.component.html',
  imports: [MatCardModule, CommonModule],
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {

  @Input() id!: number;
  @Input() date!: string;
  @Input() content!: string;
  @Input() author!: string;
  @Input() title!: string;

  @Output() articleClicked = new EventEmitter<number>();

  onArticleClick() {
    console.log(this.id)
    this.articleClicked.emit(this.id);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
