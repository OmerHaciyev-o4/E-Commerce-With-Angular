import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';

@Injectable()

export class BrandService {
    private url:string = "http://localhost:3000/brands";

    constructor(private httpClient: HttpClient) { }

    getBrands(): Observable<Brand[]>{
        return this.httpClient.get<Brand[]>(this.url);
    }
}