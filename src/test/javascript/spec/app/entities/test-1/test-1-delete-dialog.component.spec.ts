/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhipster3TestModule } from '../../../test.module';
import { Test1DeleteDialogComponent } from 'app/entities/test-1/test-1-delete-dialog.component';
import { Test1Service } from 'app/entities/test-1/test-1.service';

describe('Component Tests', () => {
    describe('Test1 Management Delete Component', () => {
        let comp: Test1DeleteDialogComponent;
        let fixture: ComponentFixture<Test1DeleteDialogComponent>;
        let service: Test1Service;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestJhipster3TestModule],
                declarations: [Test1DeleteDialogComponent]
            })
                .overrideTemplate(Test1DeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Test1DeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Test1Service);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
