import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Item } from '../shared/item.model';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Output() save: EventEmitter<Item> = new EventEmitter();
  productList: Product[] | undefined;
  formData = new Item
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
    this.formData.itemName = productSelected?.productName + ' '+ productSelected?.productBrand
  }

  saveItem() {
    this.save.emit(this.formData)
    this.formData = new Item
    this.selectedItemId = ""
  }

  resetForm() {
    this.formData = new Item
  }

  ngOnInit(): void {
  }

}
