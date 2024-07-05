import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InquiryService } from '../inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { DiologComponent } from '../diolog/diolog.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-inquery',
  templateUrl: './inquery.component.html',
  styleUrls: ['./inquery.component.css']
})
export class InqueryComponent {

  inquiryForm: FormGroup;

  constructor(private fb: FormBuilder, private inquiryService: InquiryService, private dialog: MatDialog, private router: Router) {
    this.inquiryForm = this.fb.group({
      nameOfSender: ['', Validators.required],
      emailOfSender: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      bussiness: ['', ],
      inqueryFor: ['', Validators.required],
      messageFromSender: ['', ],
      addressOfSender: ['', ]
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
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
