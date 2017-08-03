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
})
export class NotificationItemComponent {
  @Input() notification = {};
  @Output() accept = new EventEmitter<number>();
  @Output() reject = new EventEmitter<number>();
}
