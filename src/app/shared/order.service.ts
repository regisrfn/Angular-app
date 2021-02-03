import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from './item.model';
import { Notification } from './notification.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  @Output() createdOrder: EventEmitter<Notification> = new EventEmitter();
  formData: Order = new Order;
  itemList: Item[] = [];

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(environment.apiOrder).toPromise();
  }

  getPage(pageNumber: number, pageSize = 10) {
    return this.http.get(`${environment.apiOrder}/page?number=${pageNumber}&size=${pageSize}`).toPromise();
  }

  getOne(id: string) {
    return this.http.get(environment.apiOrder + `/${id}`).toPromise()
  }

  save(order: Order) {
    return this.http.post(environment.apiOrder, order).toPromise();
  }

  delete(id: string | undefined) {
    return this.http.delete(environment.apiOrder + `/${id}`).toPromise()
  }
}
