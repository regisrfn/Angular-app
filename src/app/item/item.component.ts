import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Item } from '../shared/item.model';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Output() save: EventEmitter<{ item: Item, op: number }> = new EventEmitter();
  @Input() newFormData: Item | undefined
  formData = new Item
  operation = 0

  productList: Product[] | undefined;
  selectedItemId = ""

  constructor(productService: ProductService) {

    productService.getProductList()
      .then(productList => {
        this.productList = productList as Product[]
      })

  }

  selectProduct(obj: EventTarget | null) {
    let value = (obj as HTMLInputElement).value
    let productSelected = this.productList?.filter(product => product.productId === value)[0]
    this.formData.productId = productSelected?.productId
    this.formData.itemName = productSelected?.productName + ' ' + productSelected?.productBrand
    this.formData.itemPrice = productSelected?.productPrice || 0
  }

  saveItem() {
    this.save.emit({ item: this.formData, op: this.operation })
    this.setForm()
    this.operation = 0
  }

  setForm() {
    this.formData = new Item
    this.selectedItemId = ""
  }

  ngOnInit(): void {
    this.setForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.newFormData.currentValue) {
      this.selectedItemId = this.newFormData?.productId || ""
      this.formData = changes.newFormData.currentValue
      this.operation = 1
    }
  }

}
