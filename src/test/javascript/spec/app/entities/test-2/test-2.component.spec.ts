/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhipster3TestModule } from '../../../test.module';
import { Test2Component } from 'app/entities/test-2/test-2.component';
import { Test2Service } from 'app/entities/test-2/test-2.service';
import { Test2 } from 'app/shared/model/test-2.model';

describe('Component Tests', () => {
    describe('Test2 Management Component', () => {
        let comp: Test2Component;
        let fixture: ComponentFixture<Test2Component>;
        let service: Test2Service;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestJhipster3TestModule],
                declarations: [Test2Component],
                providers: []
            })
                .overrideTemplate(Test2Component, '')
                .compileComponents();

            fixture = TestBed.createComponent(Test2Component);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Test2Service);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Test2(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.test2S[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
