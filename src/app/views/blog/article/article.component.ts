import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {ActivatedRoute} from "@angular/router";
import {CommentType} from "../../../../types/comment.type";
import {CommentService} from "../../../shared/services/comment.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: ArticleType  | null = null;
  articlesRelated: ArticleType[] = [];
  allCount: number = 0
  comments: CommentType[] = [];


  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private commentService: CommentService) { }

  ngOnInit(): void {

   this.route.queryParams.subscribe( params => {
     const url = params['name']
     if(url) {
       this.articleService.getArticle(url)
         .subscribe(data => {
           this.article = data

           if(this.article) {
             this.commentService.getComments(3, this.article.id)
               .subscribe(response => {
                 const {allCount, comments} = response
                 this.allCount = allCount
                 this.comments = comments
               })
           }
         })

       this.articleService.getRelatedArticles(url)
         .subscribe(data => {
           this.articlesRelated = data
         })
     }
   })
  }
}
