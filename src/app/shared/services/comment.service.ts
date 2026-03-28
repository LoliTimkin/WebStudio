import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";
import {CommentType} from "../../../types/comment.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  getComments(offset: number, articleId: string): Observable<{allCount: number, comments: CommentType[]}> {
    return this.http.get<{allCount: number, comments: CommentType[]}>('http://localhost:3000/api/comments?offset='
      + offset + '&article=' + articleId)
  }

  addComment(text: string, articleId: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>('http://localhost:3000/api/comments',
      {text: text, article: articleId}
    )
  }

}
