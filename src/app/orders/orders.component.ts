import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { Page } from '../shared/page.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  ordersList: Order[] = []
  customersList: Customer[] = []
  page = new Page

  constructor(private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setOrdersList(this.route.snapshot.params['pageNumber'])
  }

  private setOrdersList(pageNumber: number) {
    this.orderService.getPage(pageNumber)
      .then((page) => {
        this.page = page as Page
        this.ordersList = this.page.ordersList || []
      })
      .catch(err => { })
  }

  navigateToOrder(orderId: string | undefined) {
    if (orderId) {
      this.router.navigate([`order/${orderId}`])
    }

  }

  nextPage() {    
    this.router.navigate([`orders/${this.page.pageNumber+1}`])
    this.setOrdersList(this.page.pageNumber+1)
  }

  previousPage() {    
    this.router.navigate([`orders/${this.page.pageNumber-1}`])
    this.setOrdersList(this.page.pageNumber-1)
  }

  trackByFn(index: any, item: any) {
    return index
  }
}
