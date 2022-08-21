import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class AccountDetailService {

    constructor(private http: HttpClient){}

    getAccountDetailById(id: any): Observable<any> {
        return this.http.get<any>(ROOT_PATH + `/account/${id}`).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    addAmount(id: any, data: any): Observable<any> {
        return this.http.patch<any>(ROOT_PATH + `/account/${id}`, data).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    transferMoney(id: any, data: any): Observable<any> {
        return this.http.post<any>(ROOT_PATH + `/account/${id}`, data).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

}