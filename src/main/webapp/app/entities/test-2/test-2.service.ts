import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITest2 } from 'app/shared/model/test-2.model';

type EntityResponseType = HttpResponse<ITest2>;
type EntityArrayResponseType = HttpResponse<ITest2[]>;

@Injectable({ providedIn: 'root' })
export class Test2Service {
    public resourceUrl = SERVER_API_URL + 'api/test-2-s';

    constructor(private http: HttpClient) {}

    create(test2: ITest2): Observable<EntityResponseType> {
        return this.http.post<ITest2>(this.resourceUrl, test2, { observe: 'response' });
    }

    update(test2: ITest2): Observable<EntityResponseType> {
        return this.http.put<ITest2>(this.resourceUrl, test2, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITest2>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITest2[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
