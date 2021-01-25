import { Component } from '@angular/core';
import { Notification } from './shared/notification.model';
import { OrderService } from './shared/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  notification = new Notification

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.createdOrder
      .subscribe((notification: Notification) => {
        this.notification = notification
      })
  }
}
