import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/shared/customer.model';
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
    orderNo: "Order Nº:",
    customerId: "Customer email:",
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

  selectedValue = {
    customerId: undefined,
    paymentMethod: ""
  };

  options = {
    customerId:[{customerEmail:""}],
    paymentMethod: [
      { type: "--Select Payment--" },
      { type: "1" },
      { type: "2" },
      { type: "3" },
      { type: "4" }
    ]
  }

  constructor(public service: OrderService, private customerService: CustomerService) {
    this.selectedValue['paymentMethod'] = this.options['paymentMethod'][0]['type']
  }

  ngOnInit(): void {
    this.resetForm()
    this.customerService.getCustomersList()
      .then(customersList => { this.options.customerId = this.options.customerId.concat(customersList as []) })
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
