/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestJhipster3TestModule } from '../../../test.module';
import { Test2UpdateComponent } from 'app/entities/test-2/test-2-update.component';
import { Test2Service } from 'app/entities/test-2/test-2.service';
import { Test2 } from 'app/shared/model/test-2.model';

describe('Component Tests', () => {
    describe('Test2 Management Update Component', () => {
        let comp: Test2UpdateComponent;
        let fixture: ComponentFixture<Test2UpdateComponent>;
        let service: Test2Service;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestJhipster3TestModule],
                declarations: [Test2UpdateComponent]
            })
                .overrideTemplate(Test2UpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Test2UpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Test2Service);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Test2(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.test2 = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Test2();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.test2 = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
