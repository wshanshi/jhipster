import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITest1 } from 'app/shared/model/test-1.model';

type EntityResponseType = HttpResponse<ITest1>;
type EntityArrayResponseType = HttpResponse<ITest1[]>;

@Injectable({ providedIn: 'root' })
export class Test1Service {
    public resourceUrl = SERVER_API_URL + 'api/test-1-s';

    constructor(private http: HttpClient) {}

    create(test1: ITest1): Observable<EntityResponseType> {
        return this.http.post<ITest1>(this.resourceUrl, test1, { observe: 'response' });
    }

    update(test1: ITest1): Observable<EntityResponseType> {
        return this.http.put<ITest1>(this.resourceUrl, test1, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITest1>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITest1[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
