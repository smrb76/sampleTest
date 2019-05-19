import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './../../services/employee.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { employee } from './../../models/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  empList: employee[];
  isLoading: boolean = false;
  displayedColumns: string[] = ['NationalIDNumber', 'LoginID', 'JobTitle', 'Gender', 'BirthDate', 'HireDate'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private empService: EmployeeService) { }
  ngOnInit() {
    this.empService.getEmployeeList().subscribe((res => {
      if (res) {
        this.empList = res;
        this.dataSource = new MatTableDataSource(this.empList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    }));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
