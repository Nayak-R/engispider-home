import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InquiryService } from '../inquiry.service';
import { DiologComponent } from '../diolog/diolog.component';

@Component({
  selector: 'app-book-demo',
  templateUrl: './book-demo.component.html',
  styleUrls: ['./book-demo.component.css']
})
export class BookDemoComponent {
  formData: any = {};

  constructor(private inquiryService: InquiryService, private dialog: MatDialog) {}

  onSubmit(): void {

    if (this.formData?.nameOfSender && this.formData?.mobileNo) {
      this.openLoader();
      this.inquiryService.demoBooking(this.formData).subscribe({
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
      this.formData = {};
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
