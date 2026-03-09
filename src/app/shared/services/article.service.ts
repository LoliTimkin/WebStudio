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

  getArticles(params?: any): Observable<{count: number, pages: number, items: ArticleType[]}> {
    return this.http.get<{count: number, pages: number, items: ArticleType[]}>('http://localhost:3000/api/articles', {
      params
    })
  }

  getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>('http://localhost:3000/api/articles/' + url)
  }

  getRelatedArticles(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>('http://localhost:3000/api/articles/related/' + url)
  }

  getCategories(): Observable<{id: string, name: string, url: string}[]> {
    return this.http.get<{id: string, name: string, url: string}[]>('http://localhost:3000/api/categories')
  }
}
