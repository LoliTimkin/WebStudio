import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';

  public isLogged$: Subject<boolean> = new Subject<boolean>();

  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<LoginResponseType | DefaultResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>('localhost:3000/auth/login',
      {email, password, rememberMe})
  }

  public getIsLoginIn(): boolean {
    return this.isLogged
  }

  public setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken)
    localStorage.setItem(this.refreshTokenKey, refreshToken)
    this.isLogged = true;
    this.isLogged$.next(true)
  }

  public removeTokens(){
    localStorage.removeItem(this.accessTokenKey)
    localStorage.removeItem(this.refreshTokenKey)
    this.isLogged = false
    this.isLogged$.next(false)
  }

  public getTokens(): {accessToken: string | null, refreshToken: string | null} {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey)
    }
  }

  set userId(id: string | null) {
    if(id) {
      localStorage.setItem(this.userIdKey, id)
    } else {
      localStorage.removeItem(this.userIdKey)
    }

  }

  get userId(): string | null {
      return localStorage.getItem(this.userIdKey)
  }




}
