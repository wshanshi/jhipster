import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITest1 } from 'app/shared/model/test-1.model';
import { Test1Service } from './test-1.service';

@Component({
    selector: 'jhi-test-1-update',
    templateUrl: './test-1-update.component.html'
})
export class Test1UpdateComponent implements OnInit {
    test1: ITest1;
    isSaving: boolean;

    constructor(private test1Service: Test1Service, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ test1 }) => {
            this.test1 = test1;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.test1.id !== undefined) {
            this.subscribeToSaveResponse(this.test1Service.update(this.test1));
        } else {
            this.subscribeToSaveResponse(this.test1Service.create(this.test1));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITest1>>) {
        result.subscribe((res: HttpResponse<ITest1>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
