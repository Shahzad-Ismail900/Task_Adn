import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/services/department.service';
import { CreateDepartmentComponent } from './create-department/create-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource !: MatTableDataSource<any>;
  constructor(private dialog: MatDialog,
    private _deptService: DepartmentService
  ) { }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {

    this.getAllDept();
  }


  getAllDept() {
    this._deptService.getAll().subscribe(response => {
      if (response.isSucessful) {
        debugger;
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  addDept() {
    let dialogref = this.dialog.open(CreateDepartmentComponent, {
      disableClose: true,
      data: 0
    });

    dialogref.afterClosed().subscribe(res => {
      if (res && res === 'success') {
        this.getAllDept();
      }
    });
  }

  editDept(id: number) {
    let dialogref = this.dialog.open(CreateDepartmentComponent, {
      disableClose: true,
      data: id
    });

    dialogref.afterClosed().subscribe(res => {
      if (res && res === 'success') {
        this.getAllDept();
      }
    });
  }

  deleteDept(id: number) {
    if (id) {
      this._deptService.delete(id).subscribe(response => {
        if (response.isSucessful) {
          this.getAllDept();

        }
      });
    }
  }
}


