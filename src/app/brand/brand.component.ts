import { Component, OnInit } from '@angular/core';
import { Brand } from '../models/brand';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  providers: [BrandService]
})
export class BrandComponent implements OnInit {

  brands: Brand[];
  selectedBrand: Brand | null = null;
  constructor(private brandService: BrandService) {
    this.brands = [];
  }

  displayAll = true;
  selectBrand(item?: Brand) {
    if (item) {
      this.selectedBrand = item;
      this.displayAll = false;
    } else {
      this.selectedBrand = null;
      this.displayAll = true;
    }
  }

  ngOnInit() {
    this.brandService.getBrands().subscribe(data=>{
      this.brands=data;
    });
  }
}
