export interface ICar {
  carPlate?: string
  model?: string
  maxSpeed?: number
  displacement?: string
}

export class Car implements ICar {
  carPlate!: string
  model!: string
  maxSpeed!: number
  displacement!: string
  constructor(instance?: ICar) {
    Object.assign(this, instance);
  }
}

export interface IDealer {
  dealerID?: number
  dealerName?: string
  carList?: ICar[]
}

export class Dealer implements IDealer {
  dealerID!: number
  dealerName!: string
  carList!: ICar[]
  constructor(instance?: IDealer) {
    Object.assign(this, instance);
  }
}
