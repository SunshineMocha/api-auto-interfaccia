import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  carPlateInput: string = "";
  dealerInput: string = "";
  brandInput: string = "";
  maxSpeedInput: string = "";
  displacementInput: string = "";

  @Output()
  carPlateInputEvent : EventEmitter<string> = new EventEmitter<string>();
  @Output()
  dealerInputEvent : EventEmitter<string> = new EventEmitter<string>();
  @Output()
  brandInputEvent : EventEmitter<string> = new EventEmitter<string>();
  @Output()
  maxSpeedInputEvent : EventEmitter<string> = new EventEmitter<string>();
  @Output()
  displacementInputEvent : EventEmitter<string> = new EventEmitter<string>();
  @Output()
  addOnClickEvent : EventEmitter<string> = new EventEmitter<string>();

  constructor(public connServ: ConnectionService){}

  onAddCarPlate(){
    this.carPlateInputEvent.emit(this.carPlateInput);
  }

  onAddDealer(){
    this.dealerInputEvent.emit(this.dealerInput);
  }

  onAddBrand(){
    this.brandInputEvent.emit(this.brandInput);
  }

  onAddMaxSpeed(){
    this.maxSpeedInputEvent.emit(this.maxSpeedInput);
  }

  onAddDisplacement(){
    this.displacementInputEvent.emit(this.displacementInput);
  }

  onAddClick(){
    this.carPlateInputEvent.emit(this.carPlateInput);
    this.dealerInputEvent.emit(this.dealerInput);
    this.brandInputEvent.emit(this.brandInput);
    this.maxSpeedInputEvent.emit(this.maxSpeedInput);
    this.displacementInputEvent.emit(this.displacementInput);
    this.addOnClickEvent.emit();
  }

  onAdd(){
    this.onAddClick()
  }
}
