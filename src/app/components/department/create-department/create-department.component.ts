import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from 'src/app/services/department.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {

  // submitted: boolean;

  deptForm!: FormGroup;
  deptId: any = 0;
  Header = "Add Department";
  
  constructor(private formBuilder: FormBuilder,
    private _deptService: DepartmentService,
    private _systemService: SystemService,
    private _snackBar: MatSnackBar,
    private dialogref: MatDialogRef<CreateDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any

  ) { }
  ngOnInit(): void {
    this.buildDeptForm();

    if (this.data != 0) {
      this.deptId = this.data;
      if (this.deptId != 0)
        this.isEdit();
    }
  }
  buildDeptForm() {
    this.deptForm = this.formBuilder.group({

      code: ['', Validators.required],
      name: ['', Validators.required],
      deptId: 0,

    });

  }
  isEdit() {
    if (this.deptId) {
      this.Header = "Edit Department";
      this._deptService.getDeptById(this.deptId).subscribe(response => {
        if (response.isSucessful) {
          let data = response.data;
          this.deptForm.patchValue(data[0]);

        }
      });
    }
  }

  onSubmit() {
    this.deptForm.markAllAsTouched();
    let request = this.deptForm.value;
    if (this.deptForm.invalid)
      return;


    request.deptId = this.deptId;
    request.createdBy = this._systemService.getUserId();
    this._deptService.save(request).subscribe(response => {
      this.shownotification("Subit sucessfully..!", "Success");
      this.dialogref.close('success');

      if (response.isSucessful) {
        // this.diagnosisId = response.key;
        // this.isEdit();
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


