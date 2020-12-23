import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getCustomersList(){
    return this.http.get("http://localhost:5000/api/v1/user").toPromise()
  }
}
