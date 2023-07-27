import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Car, Dealer, ICar, IDealer } from 'src/app/models/dealer';
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
  displayedDisplayColumns: string[] = [...this.displayedColumns, 'edit'];
  secondaryColumns: string[] = ['carPlate', 'model', 'maxSpeed', 'displacement'];
  secondaryDisplayColumns = [...this.secondaryColumns, 'edit', 'delete'];
  expandedElement!: IDealer | null;
  dataSource!: any;
  dealer: IDealer[] = [];
  dealerID!: number;

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

  // GET DEALERS
  getDealers(): void {
    this.connServ.getDealers().subscribe(data => {
      this.dealer = data;
      (this.dataSource = new MatTableDataSource(this.dealer))
    });
  }

  // TABLE ANIMATION
  toggleRow(element: IDealer) {
    element.carList && element.carList.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
  }

  // POST (DEALER)
  onAddDealer(){
    this.openPostDealerDialog();
  }

  openPostDealerDialog(){
    const dialogRef = this.dialog.open(PostDealerComponent, {
      width: '1000px',
    });
    dialogRef.componentInstance.onAddClick.subscribe(res => {
      let newDealer = {dealerID: res.dealerId, dealerName: res.dealerName, carList:[]}
      this.connServ.postDealer(newDealer).subscribe(() =>{
        this.getDealers();
        dialogRef.close();
      }
    )});
    dialogRef.componentInstance.onNoClick.subscribe(() => {
      console.log('You decided to not add anything');
      dialogRef.close();
    });
  }

  // POST (CAR)
  onAddCar(){
    this.openPostCarDialog();
  }

  openPostCarDialog(){
    const dialogRef = this.dialog.open(PostCarComponent, {
      width: '1000px'
    });
    dialogRef.componentInstance.onAddClick.subscribe(res => {
      this.connServ.postCar(res.dealerId, res.carObj).subscribe(() =>{
        this.getDealers();
        dialogRef.close();
      }
    )});
    dialogRef.componentInstance.onNoClick.subscribe(() => {
      console.log('You decided to not add anything');
      dialogRef.close();
    });
  }

  // PUT (DEALER)
  onEditDealer(dealer: IDealer){
    this.openEditDealerDialog(dealer);
  }

  openEditDealerDialog(dealer: IDealer){
    const dialogRef = this.dialog.open(PutDealerDialogComponent, {
      width: '1000px',
    });
    dialogRef.componentInstance.dealerObj = new Dealer({
      dealerID: dealer.dealerID,
      dealerName: dealer.dealerName,
      carList: dealer.carList
    });
    dialogRef.componentInstance.onEditClick.subscribe(res =>{
      this.connServ.putDealer(res.dealerObj.dealerID!, res.dealerObj).subscribe(() =>{
        this.getDealers();
        dialogRef.close();
      })
    });
    dialogRef.componentInstance.onNoClick.subscribe(() => {
      console.log('You decided to not edit anything');
      dialogRef.close();
    });
  }

  // PUT (CAR)
  onEditCar(car: ICar){
    this.openEditCarDialog(car);
  }

  openEditCarDialog(car: ICar){
    const dialogRef = this.dialog.open(PutCarDialogComponent, {
      width: '1000px',
    });
    dialogRef.componentInstance.carObj = new Car({
      carPlate: car.carPlate,
      model: car.model,
      maxSpeed: car.maxSpeed,
      displacement: car.displacement
    });
    dialogRef.componentInstance.onEditClick.subscribe(res =>{
      this.connServ.putCar(res.carObj.carPlate!, res.carObj).subscribe(() =>{
        this.getDealers();
        dialogRef.close();
      })
    });
    dialogRef.componentInstance.onNoClick.subscribe(() => {
      console.log('You decided to not edit anything');
      dialogRef.close();
    });
  }

  // DELETE
  onDelete(car: ICar) {
    console.log('Clicked car', car);
    this.openDeleteDialog(car.carPlate!);
  }

  openDeleteDialog(carPlate: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: {carPlate: carPlate}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.connServ.deleteCar(carPlate).subscribe(() => {
          console.log('Car deleted');
          this.getDealers();
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
