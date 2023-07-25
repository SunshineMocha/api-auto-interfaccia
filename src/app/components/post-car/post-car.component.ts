import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionService } from 'src/app/services/connection.service';
import { ICar } from 'src/app/models/dealer';

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

  @Input() carObj!: ICar;
  @Input() dealerID!: number;

  @Output() carObjChange: EventEmitter<ICar> = new EventEmitter<ICar>();
  @Output() dealerIDChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onAddClick: EventEmitter<any> = new EventEmitter();

  constructor(public connServ: ConnectionService){}

  ngOnInit(): void {
  }

  onAdd(){
    this.onAddClick.emit();
  }

  updateCarPlate(value: string) {
    this.carObj.carPlate = value;
    this.carObjChange.emit(this.carObj);
  }

  updateDealerId(value:number){
    this.dealerIDChange.emit(value);
  }

}
