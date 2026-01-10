import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutComponent} from "./layout/layout.component";
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {ArticleCardComponent} from "./article-card/article-card.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {DialogElementsComponent, ModalDialogComponent} from "./modal-dialog/modal-dialog.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ArticleCardComponent,
    DialogElementsComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MatSnackBarModule,
    MatMenuModule,
    RouterModule
  ],
  exports: [
    ArticleCardComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    DialogElementsComponent,
  ],
})
export class SharedModule { }
