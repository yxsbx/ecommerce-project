import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FontAwesomeModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() value!: string;
  @Input() growth!: string;
  @Input() icon!: IconProp;
  @Input() imageSrc?: string;
}
