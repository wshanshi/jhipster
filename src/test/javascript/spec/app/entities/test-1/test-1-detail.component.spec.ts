/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestJhipster3TestModule } from '../../../test.module';
import { Test1DetailComponent } from 'app/entities/test-1/test-1-detail.component';
import { Test1 } from 'app/shared/model/test-1.model';

describe('Component Tests', () => {
    describe('Test1 Management Detail Component', () => {
        let comp: Test1DetailComponent;
        let fixture: ComponentFixture<Test1DetailComponent>;
        const route = ({ data: of({ test1: new Test1(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestJhipster3TestModule],
                declarations: [Test1DetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Test1DetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Test1DetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.test1).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
