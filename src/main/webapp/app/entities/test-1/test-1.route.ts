import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Test1 } from 'app/shared/model/test-1.model';
import { Test1Service } from './test-1.service';
import { Test1Component } from './test-1.component';
import { Test1DetailComponent } from './test-1-detail.component';
import { Test1UpdateComponent } from './test-1-update.component';
import { Test1DeletePopupComponent } from './test-1-delete-dialog.component';
import { ITest1 } from 'app/shared/model/test-1.model';

@Injectable({ providedIn: 'root' })
export class Test1Resolve implements Resolve<ITest1> {
    constructor(private service: Test1Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Test1> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Test1>) => response.ok),
                map((test1: HttpResponse<Test1>) => test1.body)
            );
        }
        return of(new Test1());
    }
}

export const test1Route: Routes = [
    {
        path: 'test-1',
        component: Test1Component,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test1.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-1/:id/view',
        component: Test1DetailComponent,
        resolve: {
            test1: Test1Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test1.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-1/new',
        component: Test1UpdateComponent,
        resolve: {
            test1: Test1Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test1.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-1/:id/edit',
        component: Test1UpdateComponent,
        resolve: {
            test1: Test1Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test1.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const test1PopupRoute: Routes = [
    {
        path: 'test-1/:id/delete',
        component: Test1DeletePopupComponent,
        resolve: {
            test1: Test1Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testJhipster3App.test1.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
