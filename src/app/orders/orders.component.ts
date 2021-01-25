import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private customerService: CustomerService, 
    private router:Router) { }

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

  navigateToOrder(orderId:string | undefined){
    if(orderId){
      this.router.navigate([`order/${orderId}`])      
    }

  }

  trackByFn(index: any, item: any) {
    return index
  }

}
