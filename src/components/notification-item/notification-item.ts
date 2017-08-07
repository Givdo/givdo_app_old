import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'notification-item',
  templateUrl: 'notification-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['buttons']
})
export class NotificationItemComponent {
  @Input() buttons: boolean = false;
  @Input() notification = {};
  @Output() accept = new EventEmitter<number>();
  @Output() reject = new EventEmitter<number>();
}
