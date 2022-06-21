import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap, catchError } from 'rxjs';
import { Product } from '../models/product.repository';

@Injectable()

export class ProductService {
    private url: string = "http://localhost:3000/products";

    constructor(private httpClient: HttpClient) { }
    
    getProducts(): Observable<Product[]>{
        let newUrl=this.url;
        // if(categoryId){
        //     newUrl+='?categoryId='+categoryId;
        // }
        return this.httpClient.get<Product[]>(newUrl)
            .pipe(
                tap(data => {}),
                catchError(this.handleError)
            );
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