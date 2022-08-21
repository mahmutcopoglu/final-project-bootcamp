import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class AccountsService {

    constructor(private http: HttpClient){}

    getAccounts(): Observable<any> {
        return this.http.get<any>(ROOT_PATH + '/accounts/user').pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    getBanks(): Observable<any> {
        return this.http.get<any>(ROOT_PATH + '/banks').pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    saveAccount(data: any): Observable<any> {
        return this.http.post<any>(ROOT_PATH + '/account',data).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    getAllAccounts(): Observable<any> {
        return this.http.get<any>(ROOT_PATH + '/accounts').pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    removeAccount(id: any):Observable<any> {
        return this.http.delete<any>(ROOT_PATH + `/account/${id}`).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    

}