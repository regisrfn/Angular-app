import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getCustomersList(){
    return this.http.get("http://localhost:5010/api/v1/customer").toPromise()
  }
}
