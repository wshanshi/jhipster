/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhipster3TestModule } from '../../../test.module';
import { Test1Component } from 'app/entities/test-1/test-1.component';
import { Test1Service } from 'app/entities/test-1/test-1.service';
import { Test1 } from 'app/shared/model/test-1.model';

describe('Component Tests', () => {
    describe('Test1 Management Component', () => {
        let comp: Test1Component;
        let fixture: ComponentFixture<Test1Component>;
        let service: Test1Service;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestJhipster3TestModule],
                declarations: [Test1Component],
                providers: []
            })
                .overrideTemplate(Test1Component, '')
                .compileComponents();

            fixture = TestBed.createComponent(Test1Component);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Test1Service);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Test1(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.test1S[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
