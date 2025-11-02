import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  user: string = 'Name'
  isLogged: boolean = false

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.isLogged = this.authService.getIsLoginIn()
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe({
      next: (isLoggedIn: boolean) => {
        this.isLogged = isLoggedIn
      }
    })
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
      next:() => {
        this.doLogout()

      },
      error: () => {
        this.doLogout()
      }
    })
  }

  doLogout(): void {
    this.authService.removeTokens()
    this.authService.userId = null;
    this._snackBar.open('Вы успешно вышли из системы')
    this.router.navigate(['/'])
  }


}
