import { Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap, catchError  } from 'rxjs';
import { Card } from '../models/card.repository';

@Injectable()

export class CardService {
    private url: string = "http://localhost:3000/cards";

    constructor(private httpClient: HttpClient) { }

    getCards(cardId: number): Observable<Card[]>{
        let newUrl=this.url;
        if(cardId){
            newUrl+='?id='+cardId;
        }
        return this.httpClient.get<Card[]>(newUrl)
        .pipe(
            tap(data => {}),
            catchError(this.handleError)
        );
    }

    addCard(card: Card){
        this.httpClient.post<Card>(this.url, card).subscribe(data => {});
    }

    removeCard(id:number){
        this.httpClient.delete<Card>(this.url + "/" + id.toString());
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.log("Error : " + error.error.message);
        }
        else {
            switch (error.status) {
                case 404:
                    console.log("Not Found");
                    break;
                case 403:
                    console.log("Access Denied");
                    break;
                case 500:
                    console.log("Internal server");
                    break;
                default:
                    console.log("some unknow error happened");
            }
        }
        return throwError(() => new Error("some error happened"));
    }
}