import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITest2 } from 'app/shared/model/test-2.model';

@Component({
    selector: 'jhi-test-2-detail',
    templateUrl: './test-2-detail.component.html'
})
export class Test2DetailComponent implements OnInit {
    test2: ITest2;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ test2 }) => {
            this.test2 = test2;
        });
    }

    previousState() {
        window.history.back();
    }
}
