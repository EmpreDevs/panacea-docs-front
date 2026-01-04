import { Component, computed, inject, signal } from '@angular/core';
import { ScreenSizeService } from '@app/services';
import { Appointment, Note } from '@domain/models';
import { AppointmentDetail } from "@infra/features/appointments";
import { NoteDetail, NoteTable } from "@infra/features/notes";
import { AppointmentFacade, NotesFacade } from '@infra/store/facades';
import { UiCard, UiH2, UiIcon, UiLink } from "@infra/ui/atoms";
import { UiAccordion } from "@infra/ui/molecules";

@Component({
  selector: 'app-patient-note-detail-page',
  imports: [UiCard, NoteDetail, UiH2, AppointmentDetail, NoteTable, UiAccordion, UiLink, UiIcon],
  templateUrl: './patient-note-detail-page.html',
  styles: ``,
})
export class PatientNoteDetailPage {
                                screenService = inject(ScreenSizeService); 
    noteFacade = inject(NotesFacade); 
    appointmentFacade = inject(AppointmentFacade)

    isMobile = computed(() => this.screenService.isMobile)

    appointment = signal<Appointment | null>(null)
    notes = signal<Note[]>([])
    note = signal<Note | null>(null)

}
