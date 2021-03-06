import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../models/Country';
import { Type } from '../../models/Type';
import { SubType } from '../../models/SubType';
import { CountryService } from '../../services/country.service';
import { TypeService } from '../../services/type.service';
import { SubTypeService } from '../../services/sub-type.service';
import { Inventory } from '../../models/Inventory';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/Brand';
import { FileUploadService } from '../../services/file-upload.service';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent implements OnInit {
  invItem: Inventory;
  typeList: Type[] = [];
  redSubtypeList: SubType[] = [];
  whiteSubtypeList: SubType[] = [];
  roseSubtypeList: SubType[] = [];
  champSubtypeList: SubType[] = [];
  countryList: Country[] = [];
  brandList: Brand[] = [];
  curType = 'def';
  curSubType: string = null;
  curCountry: string = null;
  curBrand: string = null;
  error = false;


  constructor(private countries: CountryService, private types: TypeService, private subtypes: SubTypeService,
     private brands: BrandService, private fileService: FileUploadService, private invService: InventoryService,
     private router: Router) {

    this.countries.getAll().subscribe(items => {
      this.countryList = items;
      // console.log(items);
    });

    this.types.getAll().subscribe(items => {
      this.typeList = items;
      // console.log(items);
    });

    this.brands.getAll().subscribe(items => {
      this.brandList = items;
      // console.log(items);
    });

    this.subtypes.getAll().subscribe(items => {
      const stl = items;
      // console.log(stl);
      this.redSubtypeList = stl.filter((sub) => {
        return sub.type.name === 'Red';
      });
      this.whiteSubtypeList = stl.filter((sub) => {
        return sub.type.name === 'White';
      });
      this.roseSubtypeList = stl.filter((sub) => {
        return sub.type.name === 'Rosé';
      });
      this.champSubtypeList = stl.filter((sub) => {
        return sub.type.name === 'Champagne';
      });

    });
    this.invItem = JSON.parse(localStorage.getItem('invItemClicked'));
      if (this.invItem) {
          this.curCountry = this.invItem.country.name;
          this.curBrand = this.invItem.brand.name;
          this.curType = this.invItem.subType.type.name;
          this.curSubType = this.invItem.subType.name;
          document.onreadystatechange = () => {
              if (document.readyState === 'complete') {
                  const img = <HTMLInputElement> document.getElementById('img-input');
                  img.parentNode.parentNode.removeChild(img.parentNode);
              }
          };
      } else {
        this.invItem = new Inventory;
      }
  }

  updateItem() {
    this.invService.update(this.invItem).subscribe(
        resp => {
            console.log(resp as Inventory);
            this.router.navigate(['items']);
            localStorage.removeItem('invItemClicked');
        });
  }

  submitClicked() {
      localStorage.getItem('invItemClicked') ? this.updateItem() : this.addWine();
  }

   resetType() {
     this.curSubType = null;
   }

   addWine() {
     this.invItem.status = 1;
     this.invItem.userId = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).id : null;
     this.invItem.id = 0;
     // console.log(this.invItem.userId);
     this.invItem.submitted = new Date();

    this.invItem.brand = this.brandList.filter((item) => {
       return this.curBrand === item.name;
     })[0];

    this.invItem.country = this.countryList.filter((item) => {
      return this.curCountry === item.name;
    })[0];

    if (this.curType === 'Red') {
      this.invItem.subType = this.redSubtypeList.filter((item) => {
        return this.curSubType === item.name;
      })[0];
    }  else if (this.curType === 'White') {
      this.invItem.subType = this.whiteSubtypeList.filter((item) => {
        return this.curSubType === item.name;
      })[0];
    } else if (this.curType === 'Rosé') {
      this.invItem.subType = this.roseSubtypeList.filter((item) => {
        return this.curSubType === item.name;
      })[0];
    } else if (this.curType === 'Champagne') {
      this.invItem.subType = this.champSubtypeList.filter((item) => {
        return this.curSubType === item.name;
      })[0];
    }

     const img = <HTMLInputElement> document.getElementById('img-input');
     this.invItem.imageUrl = 'https://americaonwine.s3.amazonaws.com/' + (img.files[0] ? img.files[0].name : '');

     let nulled = false;
     for (const i in this.invItem) {
       if (this.invItem[i] === null) {
         nulled = true;
         break;
       }
     }

     if (nulled) {
       // console.log('SOMETHING WAS NULL!');
       this.error = true;
     } else {
      this.fileService.uploadFile(img.files[0]);
      this.invService.add(this.invItem).subscribe(item => {
        // console.log(item);
          this.router.navigate(['']);
          location.reload();
      });
     }
   }

  ngOnInit() {
  }

}
