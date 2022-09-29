
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];