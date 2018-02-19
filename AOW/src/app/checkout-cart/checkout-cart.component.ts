import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import {NgModule} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../../models/Inventory';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit {
  // cartItems: Transaction[] = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems: Transaction[] = [];
  invalidLen = false;
  newVal: String;
  sum: number;
  someArray: Transaction = new Transaction();

  constructor(private router: Router) { }

  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    for (let a = 0; a < this.cartItems.length; a++) {
      total += this.cartItems[a].total;
    }
    this.sum = total;
  }

  verify() {
    this.newVal = (<HTMLInputElement> document.getElementById('card-info')).value;

    if (this.newVal.length === 16) {
      localStorage.removeItem('cart');
      this.router.navigate(['']);
    } else {
      this.invalidLen = true;
    }
  }

  backgroundColor(item: Inventory) {
    if (item && item.subType && item.subType.type) {
      switch (item.subType.type.name) {
        case 'Red': return '#660033';
        case 'White': return '#ffff99';
        case 'Rosé': return '#ffcce6';
        case 'Champagne': return '#ffffe6';
      }
    }
  }

  textColor(item: Inventory) {
    if (item && item.subType && item.subType.type) {
      switch (item.subType.type.name) {
        case 'Red': return '#ffffff';
        default: return '#000000';
      }
    }
  }
}