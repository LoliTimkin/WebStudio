import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {ArrayType, CssSelector} from "@angular/compiler";
import {ArticleType} from "../../../types/article.type";
import {MyDialogData} from "../../../types/mydialog-data.type";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit{

  //@ViewChildren('serviceSite') serviceSelectedSite!: QueryList<ElementRef>;
  @Input()  index: number = 0;

  slides = [
    {img: "assets/images/Banner ver. 1.png"},
    {img: "assets/images/Banner ver. 2.png"},
    {img: "assets/images/Banner ver. 3.png"},
  ];

  reviews = [
    {img: "assets/images/Review_1.png"},
    {img: "assets/images/Review_2.png"},
    {img: "assets/images/Review_3.png"},
  ];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "arrows": true,
    "dots": true,
  };

  slideConfig2 = {
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "arrows": true,
    "dots": false,
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


  dataService: MyDialogData = {
    title: "Заявка на услугу",
    mode: 'service',
    buttonText: 'Подробнее',
    style: 'button btn-main',
    serviceName: "Копирайтинг"
  }

  dataService2: MyDialogData = {
    title: "Заявка на услугу",
    mode: 'service',
    buttonText: 'Подробнее',
    style: 'button services-item-button',
  }

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.articleService.getPopularArticles()
      .subscribe( (data: ArticleType[]) => {
        this.articles = data
        }
      )
  }

  getDialogData(serviceName: string): MyDialogData {
    return {
      ...this.dataService2,
      serviceName
    };
  }

  ngAfterViewInit() {
    this.activatedRoute.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
          }
        })
      }
    })
  }

}
