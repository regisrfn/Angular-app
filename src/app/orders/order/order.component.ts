import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor(public service: OrderService) { }

  ngOnInit(): void {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if (form)
      form.resetForm();
    this.service.formData = {
      orderId: undefined,
      orderNo: undefined,
      customerId: undefined,
      paymentMethod: undefined,
      totalValue: undefined

    }
  }

}
