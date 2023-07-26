import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IDealer, Dealer, ICar, Car } from 'src/app/models/dealer';

@Component({
  selector: 'app-put-dealer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './put-dealer-dialog.component.html',
  styleUrls: ['./put-dealer-dialog.component.scss']
})
export class PutDealerDialogComponent implements OnInit{


  @Input() dealerObj: IDealer = new Dealer();
  carObj: ICar = new Car();

  @Output() onEditClick: EventEmitter<{ dealerObj: IDealer, carObj: ICar}> = new EventEmitter();
  @Output() onNoClick: EventEmitter<any> = new EventEmitter();

  constructor(){}

  ngOnInit(): void {
  }

  // When NO gets clicked, the result returned to the home.component is FALSE
  onNo(): void {
    this.onNoClick.emit()
  }

  onEdit(){
    this.onEditClick.emit({ dealerObj : this.dealerObj, carObj : this.carObj});
  }
}
