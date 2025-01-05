import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {

  @Input() title!: string;
    @Input() description!: string;

    @Output() selectTitle = new EventEmitter<string>();

    public emitTitle() {
      this.selectTitle.emit(this.title);
    }

}
