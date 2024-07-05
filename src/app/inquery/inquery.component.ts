import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InquiryService } from '../inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { DiologComponent } from '../diolog/diolog.component';

@Component({
  selector: 'app-inquery',
  templateUrl: './inquery.component.html',
  styleUrls: ['./inquery.component.css']
})
export class InqueryComponent {

  inquiryForm: FormGroup;

  constructor(private fb: FormBuilder, private inquiryService: InquiryService, private dialog: MatDialog) {
    this.inquiryForm = this.fb.group({
      nameOfSender: ['', Validators.required],
      emailOfSender: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      bussiness: ['', Validators.required],
      inqueryFor: ['', Validators.required],
      messageFromSender: ['', Validators.required],
      addressOfSender: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.inquiryForm?.valid) {
      this.openLoader();
      this.inquiryService.createInquiry(this.inquiryForm.value).subscribe({
        next: (data: any) => {
          this.openDialog();
        },
        error: (error: any) => {
          this.openDialog();
        },
      })
    }
  }


  openDialog(): void {
    this.closeLoader();
    const dialogRef = this.dialog.open(DiologComponent, {
      width: '100px',
      data: 'approve'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inquiryForm.reset();
    });
  }


  openLoader(){
    const dialogRef = this.dialog.open(DiologComponent, {
      data: 'pageLoader'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeLoader() {
    this.dialog.closeAll();
  }

}
