import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ICar, Car } from 'src/app/models/dealer';

@Component({
  selector: 'app-put-car-dialog',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './put-car-dialog.component.html',
  styleUrls: ['./put-car-dialog.component.scss']
})
export class PutCarDialogComponent implements OnInit{

  @Input() carObj : ICar = new Car();
  @Input() dealerID!: number;

  @Output() onEditClick: EventEmitter<{ dealerId: number, carObj: ICar }> = new EventEmitter();
  @Output() onNoClick: EventEmitter<any> = new EventEmitter();

  constructor(){}

  ngOnInit(): void {
  }

  // When NO gets clicked, the result returned to the home.component is FALSE
  onNo(): void {
    this.onNoClick.emit()
  }

  onEdit(){
    this.onEditClick.emit({ dealerId: this.dealerID, carObj: this.carObj });
  }
}
