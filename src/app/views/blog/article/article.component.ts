import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {ActivatedRoute} from "@angular/router";
import {CommentType} from "../../../../types/comment.type";
import {CommentService} from "../../../shared/services/comment.service";
import {AuthService} from "../../../core/auth/auth.service";
import * as events from "events";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: ArticleType  | null = null;
  articlesRelated: ArticleType[] = [];
  allCount: number = 0;
  comments: CommentType[] = [];
  isLogged: boolean = false;
  commentText: string = '';
  lastComments: CommentType[] = [];



  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private authService: AuthService) {
    this.isLogged = this.authService.getIsLoginIn()
  }

  ngOnInit(): void {

   this.route.queryParams.subscribe( params => {
     const url = params['name']
     if(url) {
       this.articleService.getArticle(url)
         .subscribe(data => {
           this.article = data

           if(this.article) {
             this.commentService.getComments(0, this.article.id)
               .subscribe(response => {
                 const {allCount, comments} = response
                 this.allCount = allCount
                 this.comments = comments

                 this.commentService.getReactions(this.article!.id)
                   .subscribe(reactions => {

                     const map = new Map<string, 'like' | 'dislike'>();

                     reactions.forEach(r => {
                       map.set(r.comment, r.action);
                     });

                     // обогащаем комментарии
                     this.comments.forEach(comment => {
                       comment.userReaction = map.get(comment.id) || null;
                     });
                   });

                 this.lastComments = comments.slice(0, 3)
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

  sendComment() {
    if(this.commentText) {
      this.commentService.addComment(this.commentText, this.article!.id)
        .subscribe(() => {
          this.commentText = ''
          this.commentService.getComments(0, this.article!.id)
            .subscribe(response => {
              const {allCount, comments} = response
              this.allCount = allCount
              this.comments = comments
              this.lastComments = comments.slice(0, 3)
            })
        })
    }
  }

  openMoreComments() {
    const offset = 10
    this.lastComments = this.comments.slice(0, this.lastComments.length + offset)
  }
}
