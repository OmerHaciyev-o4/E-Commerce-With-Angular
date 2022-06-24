import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.repository';
import { Product } from '../models/product.repository';
import { AlertifyService } from '../services/alertfiy.service';
import { CardService } from '../services/card.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router'

declare let alertify: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, CardService]
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  cards: Card[] = [];
  error: any;

  constructor(private route: ActivatedRoute, private alertifyService: AlertifyService,private productService: ProductService,private cardService: CardService) {
    Card.cardService = this.cardService;
   }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
 
    this.cardService.getCards(null).subscribe(data => {
      this.cards = data;
    });

    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const brandId: string = urlParams.get('brandId');
      const colorId: string = urlParams.get('colorId');
      const categoryId: string = urlParams.get('categoryId');

      let products: Product[] = Array.from(this.products);
      let indexs: number[] = [];

      if (brandId != null && Number(brandId) > 0) {
        console.log("Brand part");
        console.log(products);
        products = products.filter(product => product.brandId == Number(brandId));
        console.log(products);
      }
      
      if (colorId != null && Number(colorId) > 0) {
        console.log("Color part");
        console.log(products);
        products = products.filter(product => product.colorId == Number(colorId));
        console.log(products);
      }
      
      if (categoryId != null && Number(categoryId) > 0) {
        console.log("Category part");
        console.log(products);
        products = products.filter(product => product.categoryId == Number(categoryId));
        console.log(products);
      }

      this.products = products;
    }, 10);
  }

  yesClick: boolean = false;

  crudProduct(item: any, product: Product, countItem: any){
    if (!product.addToCard) {
      var card = new Card();
      card.product = product;
      card.productCount = Number(countItem.value);
      card.AddToRepo();
      this.cards.push(card);

      this.alertifyService.success(item.title + ' added to card');
      product.addToCard = true;
    }
    else{
      var card: Card = null;
      
      for (let i = 0; i < this.cards.length; i++) {
        const tempCard = this.cards[i];
        if (tempCard.product.id == product.id) {
          card = tempCard;
          break;
        }        
      }

      if (card != null) {
        card.RemoveToRepo();
        product.addToCard = false;
        this.alertifyService.warning(item.title + ' removed from card');
      }
      else{
        this.alertifyService.error('Please try again later.');
      }
    }
  }
}