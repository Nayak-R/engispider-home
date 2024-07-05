import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-diolog',
  templateUrl: './diolog.component.html',
  styleUrls: ['./diolog.component.css']
})
export class DiologComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DiologComponent>) { }

  cancelPopUp() {
    this.dialogRef.close(false);
  }

  reject() {
    this.dialogRef.close(true);
  }
}
