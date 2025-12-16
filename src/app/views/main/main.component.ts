import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {ArrayType} from "@angular/compiler";
import {ArticleType} from "../../../types/article.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  slides = [
    {img: "assets/images/Banner ver. 1.png"},
    {img: "assets/images/Banner ver. 2.png"},
    {img: "assets/images/Banner ver. 3.png"},
  ];
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "arrows": true,
    "dots": true,
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  articles: ArticleType[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getPopularArticles()
      .subscribe( (data: ArticleType[]) => {
        this.articles = data
        }
      )
  }

}
