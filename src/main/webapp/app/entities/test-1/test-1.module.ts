import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestJhipster3SharedModule } from 'app/shared';
import {
    Test1Component,
    Test1DetailComponent,
    Test1UpdateComponent,
    Test1DeletePopupComponent,
    Test1DeleteDialogComponent,
    test1Route,
    test1PopupRoute
} from './';

const ENTITY_STATES = [...test1Route, ...test1PopupRoute];

@NgModule({
    imports: [TestJhipster3SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [Test1Component, Test1DetailComponent, Test1UpdateComponent, Test1DeleteDialogComponent, Test1DeletePopupComponent],
    entryComponents: [Test1Component, Test1UpdateComponent, Test1DeleteDialogComponent, Test1DeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhipster3Test1Module {}
