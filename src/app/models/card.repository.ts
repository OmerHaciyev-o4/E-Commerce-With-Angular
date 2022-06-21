import { CardService } from "../services/card.service";
import { ICard } from "./card";
import { Product } from "./product.repository";

export class Card implements ICard{
    static cardService: CardService;
    id: number;
    product: Product = null;
    productCount: number = null;
    
    constructor(){}

    AddToRepo(){
        Card.cardService.addCard(this);

        setTimeout(() => {
            Card.cardService.getCards(null).subscribe(data => {
                console.log(data);
            });            
        }, 800);
    }

    RemoveToRepo(){
        Card.cardService.removeCard(this.id);

        setTimeout(() => {
            Card.cardService.getCards(null).subscribe(data => {
                console.log(data);
            });            
        }, 800);
    }
}