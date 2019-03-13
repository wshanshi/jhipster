/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhipster3TestModule } from '../../../test.module';
import { Test2DeleteDialogComponent } from 'app/entities/test-2/test-2-delete-dialog.component';
import { Test2Service } from 'app/entities/test-2/test-2.service';

describe('Component Tests', () => {
    describe('Test2 Management Delete Component', () => {
        let comp: Test2DeleteDialogComponent;
        let fixture: ComponentFixture<Test2DeleteDialogComponent>;
        let service: Test2Service;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestJhipster3TestModule],
                declarations: [Test2DeleteDialogComponent]
            })
                .overrideTemplate(Test2DeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Test2DeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Test2Service);
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
