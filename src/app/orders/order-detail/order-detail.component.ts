import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {

  order = new Order;
  itemsList: Item[] = [];

  constructor(private route: ActivatedRoute,
    private orderService: OrderService,
    private itemService: ItemService) { }

  ngOnInit(): void {

    let orderId = this.route.snapshot.params['id']
    this.orderService.getOne(orderId)
      .then(order => {
        this.order = order as Order
        return this.itemService.getItemsFromOrder(orderId)
      })
      .then(items => this.itemsList = items as Item[])
      .catch(err => { })

  }

  trackByFn(index: any, item: any) {
    return index
  }

}
