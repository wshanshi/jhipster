/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestJhipster3TestModule } from '../../../test.module';
import { Test1UpdateComponent } from 'app/entities/test-1/test-1-update.component';
import { Test1Service } from 'app/entities/test-1/test-1.service';
import { Test1 } from 'app/shared/model/test-1.model';

describe('Component Tests', () => {
    describe('Test1 Management Update Component', () => {
        let comp: Test1UpdateComponent;
        let fixture: ComponentFixture<Test1UpdateComponent>;
        let service: Test1Service;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestJhipster3TestModule],
                declarations: [Test1UpdateComponent]
            })
                .overrideTemplate(Test1UpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Test1UpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Test1Service);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Test1(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.test1 = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Test1();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.test1 = entity;
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
