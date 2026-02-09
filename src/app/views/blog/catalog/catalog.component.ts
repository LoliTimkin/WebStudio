import { Component, OnInit } from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {ArticleService} from "../../../shared/services/article.service";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  articles: ArticleType[] = [];
  activeParams: ActiveParamsType = {categories:[]};
  pages: number[] = [];

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      //const activeParams: ActiveParamsType = {categories:[]};
      if (params.hasOwnProperty('categories[]')) {
        this.activeParams.categories = params['categories[]']
      }
      if (params.hasOwnProperty('page')) {
        this.activeParams.page = params['page']
      }

      this.loadArticles()
    })
  }


  loadArticles() {
    this.articleService.getArticles(this.activeParams)
      .subscribe(data => {
        this.pages = [];
        for (let i = 1; i <= data.pages ; i++) {
          this.pages.push(i)
        }
        this.articles = data.items;
      })
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(["/blog"], {
      queryParams: this.activeParams
    })
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(["/blog"], {
        queryParams: this.activeParams
      })
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(["/blog"], {
        queryParams: this.activeParams
      })
    }
  }

}
