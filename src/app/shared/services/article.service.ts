import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getPopularArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>('http://localhost:3000/api/articles/top')
  }
}
