import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from '../models/color';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [ColorService]
})
export class ColorComponent implements OnInit {
  colors: Color[];
  selectedColor: Color | null = null;
  constructor(
    private colorService: ColorService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  displayAll = true;
  selectColor(item?: Color) {
    if (item) {
      this.selectedColor = item;
      this.displayAll = false;
    } else {
      this.selectedColor = null;
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
    this.colorService.getColors().subscribe(data=>{
      this.colors=data;
    });

    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const colorId: String = urlParams.get('colorId');
      if (colorId == "0") {
        this.selectColor();        
      }
      else if(colorId != null){
        this.selectColor(this.colors[Number(colorId) - 1]);
      }
    }, 100);
  }
}