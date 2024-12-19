import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input() title!: string;
  @Input() description!: string;

  @Output() selectTitle = new EventEmitter<string>();

  public emitTitle() {
    this.selectTitle.emit(this.title);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  

}
