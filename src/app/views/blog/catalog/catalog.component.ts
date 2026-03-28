import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {ArticleService} from "../../../shared/services/article.service";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  articles: ArticleType[] = [];
  activeParams: ActiveParamsType = {};
  pages: number[] = [];
  filterIsOpened: boolean = false;
  categories: {name: string, url: string}[] = [];
  selectedCategories: {name: string, url: string}[] = [];

  private subscription: Subscription | null = null;

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      //const activeParams: ActiveParamsType = {categories:[]};

      if (params.hasOwnProperty('page')) {
        this.activeParams.page = params['page']
      }
      if (params.hasOwnProperty('categories')) {
        this.activeParams.categories = Array.isArray(params['categories'])
          ? params['categories'] : [params['categories']];
      } else {
        this.activeParams.categories = []
      }

      this.loadArticles()
      this.loadCategories()
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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

  loadCategories() {
    this.articleService.getCategories()
      .subscribe(data => {
      this.categories = data.map(item => ({
        name: item.name,
        url: item.url
      }))
        this.syncSelectedCategories();
    })
  }

  syncSelectedCategories(): void {
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      this.selectedCategories = this.categories.filter(category =>
        this.activeParams.categories?.includes(category.url)
      );
    } else {
      this.selectedCategories = [];
    }
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

  toogleFilter() {
    this.filterIsOpened = !this.filterIsOpened
  }

  toggleCategory(category: {name: string, url: string}, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const index = this.selectedCategories.findIndex(c => c.url === category.url);

    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }

    this.activeParams.categories = this.selectedCategories.map(item => item.url);

    this.activeParams.page = 1;

    this.router.navigate(["/blog"], {
      queryParams: this.activeParams
    })
  }

  isCategorySelected(category: {name: string, url: string}): boolean {
    return this.selectedCategories.some(c => c.url === category.url);
  }

  removeCategory(category: {name: string, url: string}): void {
    this.selectedCategories = this.selectedCategories.filter(c => c !== category);

    this.activeParams.categories = this.selectedCategories.map(item => item.url);

    this.activeParams.page = 1;

    this.router.navigate(["/blog"], {
      queryParams: this.activeParams
    })
  }

}
