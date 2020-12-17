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

  formLabels = {
    orderId: "Order ID:",
    orderNo: "Order Nº:",
    customerId: "Customer Id:",
    paymentMethod: "Payment:",
    totalValue: "Total Value:"

  }

  formIcons = {
    orderId: '../../../assets/svg/user.svg',
    orderNo: '../../../assets/svg/user.svg',
    customerId: '../../../assets/svg/user.svg',
    paymentMethod: '../../../assets/svg/cards.svg',
    totalValue: '../../../assets/svg/user.svg'
  }

  title = {
    customerId:"",
    paymentMethod:""
  };

  options = {
    customerId: [
      { id: "--Select Client--" },
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" }
    ],
    paymentMethod: [
      { id: "--Select Payment--" },
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" }
    ]
  }

  constructor(public service: OrderService) {
    this.title['customerId'] = this.options['customerId'][0]['id']
    this.title['paymentMethod'] = this.options['paymentMethod'][0]['id']
  }

  ngOnInit(): void {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    form?.resetForm();
    this.service.formData = {
      orderId: undefined,
      orderNo: uuidv4(),
      customerId: undefined,
      paymentMethod: undefined,
      totalValue: undefined

    }
  }

  trackByFn(index: any, item: any) {
    return index
  }

}
