
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

// import { debug } from 'console';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['empCode', 'empName', 'deptName', 'empType', 'empStatus', 'email', 'action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource !: MatTableDataSource<any>;
  constructor(private dialog: MatDialog,
    private _empService: EmployeeService
  ) { }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.getAllEmp();
  }

  getAllEmp() {
    this._empService.getAll().subscribe(response => {
      if (response.isSucessful) {
        debugger;
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  addEmp() {
    let dialogref = this.dialog.open(CreateEmployeeComponent, {
      disableClose: true,
      data: 0
    });

    dialogref.afterClosed().subscribe(res => {
      if (res && res === 'success') {
        this.getAllEmp();
      }
    });
  }

  editEmp(id: number) {
    let dialogref = this.dialog.open(CreateEmployeeComponent, {
      disableClose: true,
      data: id
    });

    dialogref.afterClosed().subscribe(res => {
      if (res && res === 'success') {
        this.getAllEmp();
      }
    });
  }

  deleteEmp(id: number) {
    if (id) {
      this._empService.delete(id).subscribe(response => {
        if (response.isSucessful) {
          this.getAllEmp();

        }
      });
    }
  }
}

