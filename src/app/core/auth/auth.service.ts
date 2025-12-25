import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {UserType} from "../../../types/user.type";

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
    return this.http.post<LoginResponseType | DefaultResponseType>('http://localhost:3000/api/login',
      {email, password, rememberMe})
  }

  signup(name: string,email: string, password: string): Observable<LoginResponseType | DefaultResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>('http://localhost:3000/api/signup',
      {name, email, password})
  }

  logout(): Observable<DefaultResponseType> {
    const tokens = this.getTokens();
    if(tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>('http://localhost:3000/api/logout',
        {
          refreshToken: tokens.refreshToken
        })
    }
    throw throwError(() => 'Can not find token')
  }

  refresh(): Observable<DefaultResponseType | LoginResponseType> {
    const tokens = this.getTokens();
    if(tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType | LoginResponseType>('http://localhost:3000/api/refresh', {
        refreshToken: tokens.refreshToken
      })
    }
    throw throwError(() => 'Can not use token' )
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

  getUser(): Observable<DefaultResponseType | UserType> {
    return this.http.get<DefaultResponseType | UserType>('http://localhost:3000/api/users')

  }



}
