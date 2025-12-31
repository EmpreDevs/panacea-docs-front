import { Component, computed, inject, signal } from '@angular/core'

import { ScreenSize, ScreenSizeService } from '@app/services'

import { Appointment } from '@domain/models'

import { AppointmentList, AppointmentSidebar, AppointmentSidebarView } from '@infra/features/appointments'
import { UiCard } from '@infra/ui/atoms'

@Component({
	selector: 'app-appointments-list-page',
	imports: [UiCard, AppointmentList, AppointmentSidebar],
	templateUrl: './appointments-list-page.html',
	styles: ``,
})
export class AppointmentsListPage {
	screenSizeService = inject(ScreenSizeService)
	openSidebar = signal(false)
	viewSelect = signal<AppointmentSidebarView>(AppointmentSidebarView.None)
	appointmentSelected: Appointment | null = null
	appointments: Appointment[] = [
		{
			id: '1',
			title: 'Consulta General - Dr. García',
			startDate: new Date('2025-12-29T09:00:00'),
			endDate: new Date('2025-12-29T09:30:00'),
			estimation: 30,
			patientId: 'patient-001',
			healthProviderId: 'doctor-garcia',
			tenantId: 'clinic-001',
			properties: {
				patientName: 'María González',
				appointmentType: 'Consulta General',
				status: 'confirmed',
			},
		},
		{
			id: '2',
			title: 'Control Prenatal - Dra. Martínez',
			startDate: new Date('2025-12-29T10:00:00'),
			endDate: new Date('2025-12-29T11:00:00'),
			estimation: 60,
			patientId: 'patient-002',
			healthProviderId: 'doctor-martinez',
			tenantId: 'clinic-001',
			properties: {
				patientName: 'Ana Rodríguez',
				appointmentType: 'Control Prenatal',
				status: 'confirmed',
				notes: 'Semana 24',
			},
		},
		{
			id: '3',
			title: 'Revisión Cardiológica - Dr. López',
			startDate: new Date('2025-12-29T14:00:00'),
			endDate: new Date('2025-12-29T14:45:00'),
			estimation: 45,
			patientId: 'patient-003',
			healthProviderId: 'doctor-lopez',
			tenantId: 'clinic-001',
			properties: {
				patientName: 'Carlos Pérez',
				appointmentType: 'Cardiología',
				status: 'pending',
			},
		},
		{
			id: '4',
			title: 'Consulta Pediátrica - Dra. Torres',
			startDate: new Date('2025-12-29T08:30:00'),
			endDate: new Date('2025-12-29T09:00:00'),
			estimation: 30,
			patientId: 'patient-004',
			healthProviderId: 'doctor-torres',
			tenantId: 'clinic-001',
			properties: {
				patientName: 'Sofía Ramírez',
				appointmentType: 'Pediatría',
				status: 'confirmed',
				notes: 'Control de vacunas',
			},
		},
		{
			id: '5',
			title: 'Terapia Física - Lic. Fernández',
			startDate: new Date('2025-12-29T15:00:00'),
			endDate: new Date('2025-12-29T16:00:00'),
			estimation: 60,
			patientId: 'patient-005',
			healthProviderId: 'therapist-fernandez',
			tenantId: 'clinic-001',
			properties: {
				patientName: 'Roberto Sánchez',
				appointmentType: 'Fisioterapia',
				status: 'confirmed',
				notes: 'Sesión 5/10',
			},
		},
		{
			id: '6',
			title: 'Consulta Dermatológica - Dra. Hernández',
			startDate: new Date('2025-12-29T11:00:00'),
			endDate: new Date('2025-12-29T11:30:00'),
			estimation: 30,
			patientId: 'patient-006',
			healthProviderId: 'doctor-hernandez',
			tenantId: 'clinic-001',
			properties: {
				patientName: 'Laura Jiménez',
				appointmentType: 'Dermatología',
				status: 'pending',
			},
		},
		{
			id: '7',
			title: 'Examen de Laboratorio',
			startDate: new Date('2025-12-29T07:00:00'),
			endDate: new Date('2025-12-29T07:15:00'),
			estimation: 15,
			patientId: 'patient-007',
			healthProviderId: 'lab-tech-001',
			tenantId: 'clinic-001',
			properties: {
				patientName: 'Diego Morales',
				appointmentType: 'Laboratorio',
				status: 'confirmed',
				notes: 'En ayunas',
			},
		},
		{
			id: '8',
			title: 'Consulta Odontológica - Dr. Vargas',
			startDate: new Date('2026-01-08T16:00:00'),
			endDate: new Date('2026-01-08T16:45:00'),
			estimation: 45,
			patientId: 'patient-008',
			healthProviderId: 'dentist-vargas',
			tenantId: 'clinic-001',
			properties: {
				patientName: 'Patricia Castro',
				appointmentType: 'Odontología',
				status: 'confirmed',
				notes: 'Limpieza dental',
			},
		},
	]

	dateToCreate = new Date()
	ScreenSize = ScreenSize

	isMobile = computed(() => {
		return this.screenSizeService.currentSize !== ScreenSize.LARGE_DESKTOP
	})
	toggleModal = signal(false)

	closeSidebar() {
		this.viewSelect.set(AppointmentSidebarView.None)
		this.appointmentSelected = null
		this.openSidebar.set(false)
	}

	updateAppointment(event: Appointment) {
		this.appointments = this.appointments.map(appointment => {
			if (appointment.id === event.id) {
				return event
			}
			return appointment
		})
		this.launchViewDetail(event)
	}
	createAppointment(date: Date) {
		this.viewSelect.set(AppointmentSidebarView.Form)
		this.dateToCreate = date
		this.openSidebar.set(true)
	}
	launchViewDetail(appointment: Appointment) {
		this.viewSelect.set(AppointmentSidebarView.Detail)
		this.appointmentSelected = appointment
		this.toggleModal.set(true)
	}
	closeModal() {
		console.log('closeModal')
		this.appointmentSelected = null
		this.toggleModal.set(false)
	}
}
