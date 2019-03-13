import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Test2 } from 'app/shared/model/test-2.model';
import { Test2Service } from './test-2.service';
import { Test2Component } from './test-2.component';
import { Test2DetailComponent } from './test-2-detail.component';
import { Test2UpdateComponent } from './test-2-update.component';
import { Test2DeletePopupComponent } from './test-2-delete-dialog.component';
import { ITest2 } from 'app/shared/model/test-2.model';

@Injectable({ providedIn: 'root' })
export class Test2Resolve implements Resolve<ITest2> {
    constructor(private service: Test2Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Test2> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Test2>) => response.ok),
                map((test2: HttpResponse<Test2>) => test2.body)
            );
        }
        return of(new Test2());
    }
}

export const test2Route: Routes = [
    {
        path: 'test-2',
        component: Test2Component,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test2.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-2/:id/view',
        component: Test2DetailComponent,
        resolve: {
            test2: Test2Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test2.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-2/new',
        component: Test2UpdateComponent,
        resolve: {
            test2: Test2Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test2.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-2/:id/edit',
        component: Test2UpdateComponent,
        resolve: {
            test2: Test2Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test2.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const test2PopupRoute: Routes = [
    {
        path: 'test-2/:id/delete',
        component: Test2DeletePopupComponent,
        resolve: {
            test2: Test2Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test2.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
