import { User } from './User';
import { Brand } from './Brand';
import { Country } from './Country';
import { SubType } from './SubType';

export class Inventory {
    id: number;
    name: string;
    brand: Brand;
    userId: number;
    country: Country;
    subType: SubType;
    volume: number;
    year: number;
    price: number;
    quantity: number;
    submitted: Date;
    status: number;
    description: string;
    imageUrl: string;

    constructor() {
      this.id = null;
      this.name = null;
      this.brand = null;
      this.userId = null;
      this.country = null;
      this.subType = null;
      this.volume = null;
      this.year = null;
      this.price = null;
      this.quantity = null;
      this.submitted = null;
      this.status = null;
      this.description = null;
      this.imageUrl = null;
    }
}
