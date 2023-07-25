import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public connServ: ConnectionService) {}

  onNoClick(): void {
    this.dialogRef.close(false);
    console.log("Hai scelto di non editare")
  }

  onYesClick(): void {
    console.log("Hai scelto di editare")
  }
}
