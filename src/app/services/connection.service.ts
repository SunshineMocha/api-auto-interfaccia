import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Dealer, ICar, IDealer } from '../models/dealer';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  // API Endpoint
  readonly BASE_URL = 'https://localhost:44359/api/CarDealer';

  constructor(private http: HttpClient) { }

  // Getting ALL the car dealers
  getDealers(){
    return this.http.get<Dealer[]>(this.BASE_URL);
  }

  // Getting the car dealer by ID
  getDealersById(dealerID: number){
    return this.http.get<Dealer[]>(`${this.BASE_URL}/${dealerID}`);
  }

  // Creating a car dealer with no cars
  postDealer(newDealer: IDealer){
    return this.http.post(`${this.BASE_URL}`, newDealer);
  }

  // Creating a new car record to an existing car dealer
  postCar(dealerID: number, newCar: ICar){
    return this.http.post(`${this.BASE_URL}/${dealerID}`, newCar);
  }

  // Updating car dealer ID and name
  putDealer(dealerID: number, updatedDealer: IDealer){
    return this.http.put(`${this.BASE_URL}?id=${dealerID}`, updatedDealer)
  }

  // Update of a single car object
  putCar(carPlate: string, updatedCar: ICar){
    return this.http.put(`${this.BASE_URL}/${carPlate}`, updatedCar)
  }

  // Deleting a car by its plate
  deleteCar(carPlate: string){
    return this.http.delete(`${this.BASE_URL}/${carPlate}`);
  }
}
