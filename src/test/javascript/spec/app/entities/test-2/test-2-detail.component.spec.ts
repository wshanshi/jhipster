/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestJhipster3TestModule } from '../../../test.module';
import { Test2DetailComponent } from 'app/entities/test-2/test-2-detail.component';
import { Test2 } from 'app/shared/model/test-2.model';

describe('Component Tests', () => {
    describe('Test2 Management Detail Component', () => {
        let comp: Test2DetailComponent;
        let fixture: ComponentFixture<Test2DetailComponent>;
        const route = ({ data: of({ test2: new Test2(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestJhipster3TestModule],
                declarations: [Test2DetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Test2DetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Test2DetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.test2).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
