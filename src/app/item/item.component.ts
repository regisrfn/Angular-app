import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item.model';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  productList: Product[] | undefined;
  formData = new Item

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
  }

  saveItem(){
    
  }

  resetForm(){
    this.formData = new Item
  }

  ngOnInit(): void {
  }

}
