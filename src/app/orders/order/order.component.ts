import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor(public service: OrderService) { }

  formLabels = {
    orderId: "Order ID:",
    orderNo: "Order Nº:",
    customerId: "Customer Id:",
    paymentMethod: "Payment",
    totalValue: "Total Value"

  }

  ngOnInit(): void {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if (form)
      form.resetForm();
    this.service.formData = {
      orderId: undefined,
      orderNo: uuidv4(),
      customerId: undefined,
      paymentMethod: undefined,
      totalValue: undefined

    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
