import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})

export class CategoryComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category | null = null;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  displayAll = true;
  selectCategory(item?: Category) {
    if (item) {
      this.selectedCategory = item;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
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
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    });

    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryId: String = urlParams.get('categoryId');
      if (categoryId == "0") {
        this.selectCategory();        
      }
      else if(categoryId != null){
        this.selectCategory(this.categories[Number(categoryId) - 1]);
      }
    }, 100);
  }
}
