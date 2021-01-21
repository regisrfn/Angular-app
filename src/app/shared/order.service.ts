import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from './item.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order = new Order;
  itemList: Item[] = [];

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(environment.apiOrder).toPromise();
  }

  save(order:Order){
    return this.http.post(environment.apiOrder,order).toPromise();
  }

  delete(id:string | undefined){
    return this.http.delete(environment.apiOrder+`/${id}`).toPromise()
  }
}
