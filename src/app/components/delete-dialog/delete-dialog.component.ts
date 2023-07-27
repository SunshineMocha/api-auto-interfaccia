import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  templateUrl: './delete-dialog.component.html',
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public connServ: ConnectionService) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
