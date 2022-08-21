import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient){}

    getAccounts(): Observable<any> {
        return this.http.get<any>(ROOT_PATH + '/accounts/user').pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    
}