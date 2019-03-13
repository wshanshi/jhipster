import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITest2 } from 'app/shared/model/test-2.model';
import { Test2Service } from './test-2.service';

@Component({
    selector: 'jhi-test-2-update',
    templateUrl: './test-2-update.component.html'
})
export class Test2UpdateComponent implements OnInit {
    test2: ITest2;
    isSaving: boolean;

    constructor(private test2Service: Test2Service, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ test2 }) => {
            this.test2 = test2;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.test2.id !== undefined) {
            this.subscribeToSaveResponse(this.test2Service.update(this.test2));
        } else {
            this.subscribeToSaveResponse(this.test2Service.create(this.test2));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITest2>>) {
        result.subscribe((res: HttpResponse<ITest2>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
