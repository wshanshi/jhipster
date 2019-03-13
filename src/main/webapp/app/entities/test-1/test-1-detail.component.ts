import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITest1 } from 'app/shared/model/test-1.model';

@Component({
    selector: 'jhi-test-1-detail',
    templateUrl: './test-1-detail.component.html'
})
export class Test1DetailComponent implements OnInit {
    test1: ITest1;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ test1 }) => {
            this.test1 = test1;
        });
    }

    previousState() {
        window.history.back();
    }
}
