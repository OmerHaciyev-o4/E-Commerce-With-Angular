import { Component, OnInit } from '@angular/core';
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
  constructor(private colorService: ColorService) {
    this.colors = [];
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

  ngOnInit() {
    this.colorService.getColors().subscribe(data=>{
      this.colors=data;
    });
  }
}
