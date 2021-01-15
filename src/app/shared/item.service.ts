import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }

  saveItem(item:Item){
    return this.http.post("http://localhost:5030/api/v1/item",item).toPromise()
  }

}
