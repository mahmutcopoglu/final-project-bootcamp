import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class BankService {

    constructor(private http: HttpClient){}


    getBanks(): Observable<any> {
        return this.http.get<any>(ROOT_PATH + '/banks').pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    saveBank(data: any): Observable<any> {
        return this.http.post<any>(ROOT_PATH + '/bank',data).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }


}