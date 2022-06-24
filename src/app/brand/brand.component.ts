import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute) {
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

  reloadAllComponent(){
    setTimeout(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(['/'], {
        relativeTo: this.route,
        queryParamsHandling: "merge"
      });
    }, 10);
  }

  ngOnInit() {
    this.brandService.getBrands().subscribe(data=>{
      this.brands=data;
    });

    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const brandId: String = urlParams.get('brandId');
      if (brandId == "0") {
        this.selectBrand();        
      }
      else if(brandId != null){
        this.selectBrand(this.brands[Number(brandId) - 1]);
      }
    }, 100);
  }
}