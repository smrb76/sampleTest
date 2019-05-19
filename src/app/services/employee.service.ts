import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeList() {
    return this.http.get<employee[]>('https://api.tsetab.com/api/books/EmployeeList');
  }
}
