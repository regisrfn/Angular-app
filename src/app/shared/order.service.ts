import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order = new Order;

  constructor(private http:HttpClient) { }

  save(order:Order){
    return this.http.post(environment.apiOrder,order).toPromise();
  }
}
