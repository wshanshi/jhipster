import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestJhipster3SharedModule } from 'app/shared';
import {
    Test2Component,
    Test2DetailComponent,
    Test2UpdateComponent,
    Test2DeletePopupComponent,
    Test2DeleteDialogComponent,
    test2Route,
    test2PopupRoute
} from './';

const ENTITY_STATES = [...test2Route, ...test2PopupRoute];

@NgModule({
    imports: [TestJhipster3SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [Test2Component, Test2DetailComponent, Test2UpdateComponent, Test2DeleteDialogComponent, Test2DeletePopupComponent],
    entryComponents: [Test2Component, Test2UpdateComponent, Test2DeleteDialogComponent, Test2DeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhipster3Test2Module {}
