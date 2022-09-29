import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  // submitted: boolean;

  empForm!: FormGroup;
  deptId: any = 0;
  empId: number = 0;
  status: any[] = []
  types: any[] = [];
  department: any[] = [];
  Header: string = "Add Employee";

  constructor(private formBuilder: FormBuilder,
    private _empService: EmployeeService,
    private _deptService: DepartmentService,
    private _systemService : SystemService,
    private _snackBar: MatSnackBar,
    private dialogref: MatDialogRef<CreateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any

  ) { }
  ngOnInit(): void {
    this.buildEmpForm();
    this.FillCombo();

    if (this.data != 0) {
      this.empId = this.data;
      if (this.empId != 0)
        this.isEdit();
    }
  }
  buildEmpForm() {
    this.empForm = this.formBuilder.group({

      code: ['', Validators.required],
      name: ['', Validators.required],
      deptId: ['', Validators.required],
      empTypeId: ['', Validators.required],
      empStatusId: ['', Validators.required],
      contactNo: [''],
      email: [''],
      empId: 0,

    });

  }

  isEdit() {
    if (this.empId) {
      this.Header = "Edit Employee";
      this._empService.getEmpById(this.empId).subscribe(response => {
        if (response.isSucessful) {
          let data = response.data;
          this.empForm.patchValue(data[0]);

        }
      });
    }
  }
  getAllDept() {
    this._deptService.getAll().subscribe(response => {
      if (response.isSucessful) {
        this.department = response.data;

      }
    });
  }

  getemployeeStatus() {
    this._empService.getemployeeStatus().subscribe(response => {
      if (response.isSucessful) {
        debugger;
        this.status = response.data;

      }
    });
  }
  getemployeeType() {
    this._empService.getemployeeType().subscribe(response => {
      if (response.isSucessful) {
        debugger;
        this.types = response.data;

      }
    });
  }

  FillCombo() {
    this.getAllDept();
    this.getemployeeType();
    this.getemployeeStatus();
  }
  onSubmit() {
    this.empForm.markAllAsTouched();
    let request = this.empForm.value;
    if (this.empForm.invalid)
      return;


    request.empId = this.empId;
    request.createdBy = this._systemService.getUserId();

    this._empService.save(request).subscribe(response => {
      this.shownotification("Subit sucessfully..!", "Success");
      this.dialogref.close('success');

      if (response.isSucessful) {
        this.dialogref.close("success");
      }
    });
  }
  shownotification(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  cancel() {
    this.dialogref.close();
  }
}


