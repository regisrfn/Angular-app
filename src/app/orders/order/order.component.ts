import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/shared/customer.service';
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
    orderNumber: "Order Nº:",
    customerId: "Customer email:",
    orderPaymentMethod: "Payment:",
    orderTotalValue: "Total Value:"

  }
  formIcons = {
    orderId: '../../../assets/svg/user.svg',
    orderNumber: '../../../assets/svg/user.svg',
    customerId: '../../../assets/svg/user.svg',
    orderPaymentMethod: '../../../assets/svg/cards.svg',
    orderTotalValue: '../../../assets/svg/user.svg'
  }

  selectedValue = {
    customerId: undefined,
    orderPaymentMethod: ""
  };

  options = {
    customerId: [{ customerEmail: "", customerId: "" }],
    orderPaymentMethod: [
      { type: "--Select Payment--" },
      { type: "Card" },
      { type: "Cash" },
      { type: "3" },
      { type: "4" }
    ]
  }

  constructor(public service: OrderService, private customerService: CustomerService, private orderService: OrderService) {
    this.selectedValue['orderPaymentMethod'] = this.options['orderPaymentMethod'][0]['type']
  }

  ngOnInit(): void {
    this.resetForm()
    this.customerService.getCustomersList()
      .then(customersList => { this.options.customerId = this.options.customerId.concat(customersList as []) })
  }

  selectClient(obj: EventTarget | null) {
    let value = (obj as HTMLInputElement).value
    let customerSelected = this.options.customerId.filter(customer => customer.customerEmail === value)[0]
    this.service.formData.customerId = customerSelected.customerId
  }

  selectPaymentMethod() {
    if (this.selectedValue.orderPaymentMethod === this.options['orderPaymentMethod'][0]['type'])
      this.service.formData.orderPaymentMethod = undefined
    else {
      this.service.formData.orderPaymentMethod = this.selectedValue.orderPaymentMethod
    }
  }

  resetForm(form?: NgForm) {
    form?.resetForm();
    this.service.formData = {
      orderId: uuidv4(),
      orderNumber: Math.floor((100000 + Math.random() * 900000)),
      customerId: undefined,
      orderPaymentMethod: undefined,
      orderTotalValue: 24.90,
      orderCreatedAt: undefined,
    }
  }

  saveOrder() {
    this.orderService.save(this.service.formData)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  trackByFn(index: any, item: any) {
    return index
  }

}
