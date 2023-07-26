import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-dealer',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './post-dealer.component.html',
  styleUrls: ['./post-dealer.component.scss']
})
export class PostDealerComponent implements OnInit{

  @Input() dealerID!: number;
  @Input() dealerName!: string;

  @Output() onAddClick: EventEmitter<{ dealerId: number, dealerName: string}> = new EventEmitter();
  @Output() onNoClick: EventEmitter<any> = new EventEmitter();

  constructor(){}

  ngOnInit(): void {

  }

  // When NO gets clicked, the result returned to the home.component is FALSE
  onNo(): void {
    this.onNoClick.emit()
  }

  onAdd(){
    this.onAddClick.emit({ dealerId: this.dealerID, dealerName: this.dealerName });
  }
}
