import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../models/color';

@Injectable()

export class ColorService {
    private url: string = "http://localhost:3000/colors";
    constructor(private httpClient: HttpClient) { }

    getColors():Observable<Color[]>{
        return this.httpClient.get<Color[]>(this.url);
    }
}