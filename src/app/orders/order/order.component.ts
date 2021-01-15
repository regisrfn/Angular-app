import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/shared/customer.service';
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';
import { OrderService } from 'src/app/shared/order.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  isOrderCreated = false
  message: string = ""
  msgType: string = ""

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
      { type: "CREDIT_CARD" },
      { type: "DEBIT_CARD" },
      { type: "CASH" },
      { type: "MOBILE" },
      { type: "BANK_TRANSFER" }
    ]
  }

  constructor(public service: OrderService,
    private customerService: CustomerService,
    public itemService: ItemService) {

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
    this.service.itemList = []
  }

  saveOrder() {
    this.isOrderCreated = false
    this.message = ""
    this.msgType = ""

    let order = this.service.formData
    let itemsList = this.service.itemList
    let saveItem = this.itemService.saveItem

    this.service.save(order)
      .then(() => Promise.all(itemsList.map(saveItem, this.itemService)))
      .then(() => {
        this.isOrderCreated = true
        this.message = "Order has been created."
        this.msgType = "successfully"
      })
      .catch(err => {    
        this.service.delete(order.orderId)   
        this.isOrderCreated = true
        this.message = "Error on creating order."
        this.msgType = "error"
      })
  }

  onAddItem(item: Item) {
    item.orderId = this.service.formData.orderId
    this.service.itemList.push(item)
  }

  trackByFn(index: any, item: any) {
    return index
  }

}
