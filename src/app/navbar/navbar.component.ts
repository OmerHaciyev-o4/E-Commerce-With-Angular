import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CardService]
})
export class NavbarComponent implements OnInit {
  static CardCount: number;

  constructor(private cardService: CardService) {
    setInterval(function () {
      cardService.getCards(null).subscribe(data => NavbarComponent.CardCount = data.length);
    }, 100);
  }

  ngOnInit(): void {
  }

  getCardCount(): number{
    return NavbarComponent.CardCount;
  }

}
