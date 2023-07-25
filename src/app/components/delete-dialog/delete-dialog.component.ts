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

  // When NO gets clicked, the result returned to the home.component is FALSE
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  // When YES gets clicked, the result returned to the home.component is TRUE
  onYesClick(): void {
    this.connServ.deleteCar(this.data.carPlate).subscribe(() => {
      this.dialogRef.close(true);
    }, error => {
      this.dialogRef.close(false);
    });
  }
}
