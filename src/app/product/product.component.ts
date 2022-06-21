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

    this.productService.getProducts().subscribe(data => {
      this.products = data;
      const urlParams = new URLSearchParams(window.location.search);
      const brand = urlParams.get('brand');
      const color = urlParams.get('color');
      const category = urlParams.get('category');
      console.log(brand);
      console.log(color);
      console.log(category);
    });
 
    this.cardService.getCards(null).subscribe(data => {
      this.cards = data;
    });
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.products.forEach(product => {
        this.cards.forEach(card => {
          if (card.product.id == product.id) {
            product.addToCard = true;
          }
        });
      });

    }, 100);
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
        this.alertifyService.error(item.title + ' removed from card');
      }
      else{
        this.alertifyService.warning('Please try again later.');
      }
    }


    // item.addEventListener('click',  () => {
    //   this.removeProduct(item);
    // });
  }
}