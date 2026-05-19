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
  isLogged: boolean = false;
  commentText: string = '';
  lastComments: CommentType[] = [];
  offset: number = 0;



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
           this.onloadComments(0)
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
          this.onloadComments(0)
        })
    }
  }

  onloadComments(offset: number = 0) {

    if(this.article) {
      this.commentService.getComments(offset, this.article.id)
        .subscribe(response => {
          const {allCount, comments} = response
          this.allCount = allCount

          if(offset === 0) {
            this.lastComments = comments.slice(0, 3);
          } else {
            this.lastComments = [...this.lastComments, ...comments];
          }

          console.log(allCount, this.lastComments )

          this.commentService.getReactions(this.article!.id)
            .subscribe(reactions => {

              const map = new Map<string, 'like' | 'dislike'>();

              reactions.forEach(r => {
                map.set(r.comment, r.action);
              });

              // обогащаем комментарии
              this.lastComments.forEach(comment => {
                comment.userReaction = map.get(comment.id) || null;
              });
            });
        })
    }
  }
  openMoreComments() {
    this.offset = this.lastComments.length
    this.onloadComments(this.offset)
  }
}
