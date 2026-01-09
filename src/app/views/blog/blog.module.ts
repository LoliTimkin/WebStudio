import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { ArticleComponent } from './article/article.component';
import {AppModule} from "../../app.module";
import {ArticleCardComponent} from "../../shared/article-card/article-card.component";


@NgModule({
  declarations: [
    CatalogComponent,
    ArticleComponent
  ],
    imports: [
        CommonModule,
        BlogRoutingModule
    ]
})
export class BlogModule { }
