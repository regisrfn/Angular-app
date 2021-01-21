import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  ordersList: Order[] = []
  customersList: Customer[] = []

  constructor(private orderService: OrderService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.setOrdersList()
  }

  private setOrdersList() {
    this.orderService.getAll()
      .then((ordersList) => {
        this.ordersList = ordersList as Order[]
      })
      .catch(err => { })
  }

  trackByFn(index: any, item: any) {
    return index
  }

}
