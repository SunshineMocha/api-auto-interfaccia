import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionService } from 'src/app/services/connection.service';
import { Car, ICar } from 'src/app/models/dealer';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent implements OnInit{

  @Input() carObj : ICar = new Car();
  @Input() dealerID!: number;

  @Output() onAddClick: EventEmitter<{ dealerId: number, carObj: ICar }> = new EventEmitter();
  @Output() onNoClick: EventEmitter<any> = new EventEmitter();

  constructor(){}

  ngOnInit(): void {
  }

  // When NO gets clicked, the result returned to the home.component is FALSE
  onNo(): void {
    this.onNoClick.emit()
  }

  onAdd(){
    this.onAddClick.emit({ dealerId: this.dealerID, carObj: this.carObj });
  }

}
