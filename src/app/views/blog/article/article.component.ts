import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: ArticleType  | null = null;
  articlesRelated: ArticleType[] = [];


  constructor(private articleService: ArticleService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

   this.route.queryParams.subscribe( params => {
     const url = params['name']
     if(url) {
       this.articleService.getArticle(url)
         .subscribe(data => {
           this.article = data
         })

       this.articleService.getRelatedArticles(url)
         .subscribe(data => {
           this.articlesRelated = data
         })
     }
   })
  }

}
