import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/shared/customer.service';
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';
import { OrderService } from 'src/app/shared/order.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  isOrderCreated = false
  message: string = ""
  msgType: string = ""
  item: Item | undefined
  index = 0

  formLabels = {
    orderId: "Order ID:",
    orderNumber: "Order Nº:",
    customerId: "Customer email:",
    orderPaymentMethod: "Payment:",
    orderTotalValue: "Total Value:"

  }
  formIcons = {
    orderId: '../../../assets/svg/sent.svg',
    orderNumber: '../../../assets/svg/numbers-sequence-verification-symbol.svg',
    customerId: '../../../assets/svg/message.svg',
    orderPaymentMethod: '../../../assets/svg/cards.svg',
    orderTotalValue: '../../../assets/svg/money.svg'
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
      orderTotalValue: 0.0,
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
        if (err.url === environment.apiItem) {
          this.service.delete(order.orderId)
        }
        this.isOrderCreated = true
        this.message = "Error on creating order."
        this.msgType = "error"
      })
  }

  onAddItem(el: { item: Item, op: number }) {
    el.item.orderId = this.service.formData.orderId

    switch (el.op) {
      case 0:
        this.service.itemList.push(el.item)
        break;
      case 1:
        this.service.itemList[this.index] = el.item
        this.item = undefined
        break;
      default:
        break;
    }

  }

  editItem(index: number) {
    this.index = index
    this.item = this.service.itemList[index]
  }

  trackByFn(index: any, item: any) {
    return index
  }

}
