import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConnectionService } from 'src/app/services/connection.service';
import { Car, Dealer, ICar, IDealer } from 'src/app/models/dealer';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  // First Table Column Order Definitions
  displayedColumns: string[] = ['dealerID','dealerName'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand']

  // Definition of the variables shown
  dealers: Dealer[] = [];
  cars: Car[] = [];

  constructor(public dialog: MatDialog, private connServ: ConnectionService) { }

  // GET SECTION

  ngOnInit(): void {
    // Uploads the files with a GET method during the page loading
    this.getDealers();
  }

  getDealers(): void {
    this.connServ.getDealers().subscribe(data => {
      this.dealers = data;
      console.log(this.dealers);
    });
  }

  // POST SECTION

  onAddCar() {
    // Calls the POST method and refreshes the view
  }

  // PUT SECTION

  // DELETE SECTION

  onDelete(car: ICar) {
    console.log('Clicked car', car);
  }

  openDeleteDialog(carPlate: string): void {      // Gets the CarPlate attribute as parameter
      //Dialog Creation

      // When dialog is closed, check the result and, if true, launch the DELETE method
      if(true) {
        // DELETE SUBSCRIPTION
      }
      else {
        console.log("No deletion performed")
      }
  }
}
