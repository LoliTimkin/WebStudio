import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}

  sendRequest(name: string, phone: string, service: string | undefined, type: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>('http://localhost:3000/api/requests',
      {
        name: name,
        phone: phone,
        service: service,
        type: type
      }
    )
  }
}
