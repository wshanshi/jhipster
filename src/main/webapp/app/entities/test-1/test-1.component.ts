import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITest1 } from 'app/shared/model/test-1.model';
import { Principal } from 'app/core';
import { Test1Service } from './test-1.service';

@Component({
    selector: 'jhi-test-1',
    templateUrl: './test-1.component.html'
})
export class Test1Component implements OnInit, OnDestroy {
    test1S: ITest1[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private test1Service: Test1Service,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.test1Service.query().subscribe(
            (res: HttpResponse<ITest1[]>) => {
                this.test1S = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTest1S();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITest1) {
        return item.id;
    }

    registerChangeInTest1S() {
        this.eventSubscriber = this.eventManager.subscribe('test1ListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
