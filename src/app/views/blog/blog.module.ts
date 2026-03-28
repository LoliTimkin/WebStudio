import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { ArticleComponent } from './article/article.component';
import {SharedModule} from "../../shared/shared.module";
import { CommentComponent } from './comment/comment.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CatalogComponent,
    ArticleComponent,
    CommentComponent
  ],
    imports: [
        CommonModule,
        BlogRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class BlogModule { }
