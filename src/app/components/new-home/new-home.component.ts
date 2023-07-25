import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Car, ICar, IDealer } from 'src/app/models/dealer';
import { ConnectionService } from 'src/app/services/connection.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PostCarComponent } from '../post-car/post-car.component';
import { PostDealerComponent } from '../post-dealer/post-dealer.component';
import { PutCarDialogComponent } from '../put-car-dialog/put-car-dialog.component';
import { PutDealerDialogComponent } from '../put-dealer-dialog/put-dealer-dialog.component';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class NewHomeComponent implements OnInit{

  displayedColumns: string[] = ['dealerID', 'dealerName'];
  // displayedDisplayColumns: string[] = [...this.displayedColumns, 'edit', 'delete'];
  secondaryColumns: string[] = ['carPlate', 'model', 'maxSpeed', 'displacement'];
  secondaryDisplayColumns = [...this.secondaryColumns, 'edit', 'delete'];
  expandedElement!: IDealer | null;
  dataSource!: any;
  dealer: IDealer[] = [];

  // NUOVO CODICE 25/7
  cars: Car[] = [];
  carCombo: ICar = new Car();
  dealerID!: number;
  // FINE NUOVO CODICE 25/7

  constructor(public connServ: ConnectionService, public cd: ChangeDetectorRef, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.connServ.getDealers().subscribe({
      next: (data: IDealer[]) => (
        (this.dealer = data),
        console.log(data),
        (this.dataSource = new MatTableDataSource(this.dealer))
      ),
      error: (err: any) => console.log(err),
    });
  }

  getDealers(): void {
    this.connServ.getDealers().subscribe(data => {
      this.dealer = data;
    });
  }

  toggleRow(element: IDealer) {
    element.carList && element.carList.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
  }

  // POST (DEALER)
  onAddDealer(){
    this.openPostDealerDialog();
  }

  openPostDealerDialog(){
    //Dialog Creation
    const dialogRef = this.dialog.open(PostDealerComponent, {
      width: '1000px',
    });
    // When dialog is closed, check the result and, if true, launch the DELETE method
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
      else {
        console.log('You decided to not add anything');
      }
    });
  }

  // POST (CAR)
  onAddCar(){
    this.openPostCarDialog();
  }

  openPostCarDialog(){
    //Dialog Creation
    const dialogRef = this.dialog.open(PostCarComponent, {
      width: '1000px',
    });
    // When dialog is closed, check the result and, if true, launch the DELETE method
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // NUOVO CODICE 25/7
        this.connServ.postCar(this.dealerID, this.carCombo).subscribe(() =>{
          this.getDealers()
        });
        // FINE NUOVO CODICE
      }
      else {
        console.log('You decided to not add anything');
      }
    });
  }

  // PUT (DEALER)
  onEditDealer(){
    this.openEditDealerDialog();
  }

  openEditDealerDialog(){
    //Dialog Creation
    const dialogRef = this.dialog.open(PutDealerDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
      else {
        console.log('You decided to not change anything');
      }
    });
  }

  // PUT (CAR)
  onEditCar(car: ICar){
    console.log('Clicked car', car);
    this.openEditCarDialog(car.carPlate!);
  }

  openEditCarDialog(carPlate: string){
  //Dialog Creation
    const dialogRef = this.dialog.open(PutCarDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
      else {
        console.log('You decided to not change anything');
      }
    });
  }

  // DELETE
  onDelete(car: ICar) {
    console.log('Clicked car', car);
    this.openDeleteDialog(car.carPlate!);
    //this.getDealers();
  }

  openDeleteDialog(carPlate: string): void {      // Gets the CarPlate attribute as parameter
    //Dialog Creation
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { carPlate: carPlate }
    });

    // When dialog is closed, check the result and, if true, launch the DELETE method
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.connServ.deleteCar(carPlate).subscribe(() => {
          console.log('Car deleted');
          this.connServ.getDealers().subscribe({
            next: (data: IDealer[]) => (
              (this.dealer = data),
              console.log(data),
              (this.dataSource = new MatTableDataSource(this.dealer))
            ),
            error: (err: any) => console.log(err),
          });
        },
        error => {
          console.error('Error deleting car', error);
        });
      }
      else {
        console.log('No delete performed');
      }
    });
  }
}
