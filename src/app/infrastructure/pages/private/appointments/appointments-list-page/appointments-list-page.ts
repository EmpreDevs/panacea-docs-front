import { Component } from '@angular/core'

import { Appointment } from '@domain/models'

import { AppointmentDetail } from '@infra/features/appointments/appointment-detail/appointment-detail'
import { AppointmentForm } from '@infra/features/appointments/appointment-form/appointment-form'
import { AppointmentList } from '@infra/features/appointments/appointment-list/appointment-list'
import { UiCard } from '@infra/ui/atoms'

@Component({
	selector: 'app-appointments-list-page',
	imports: [UiCard, AppointmentDetail, AppointmentList, AppointmentForm],
	templateUrl: './appointments-list-page.html',
	styles: ``,
})
export class AppointmentsListPage {
	appointmentSelected: Appointment | null = null
	appointments: Appointment[] = [
		{
			id: '1',
			title: 'Consulta General - Dr. García',
			startDate: new Date('2025-12-18T09:00:00'),
			endDate: new Date('2025-12-18T09:30:00'),
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
			startDate: new Date('2025-12-18T10:00:00'),
			endDate: new Date('2025-12-18T11:00:00'),
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
			startDate: new Date('2025-12-19T14:00:00'),
			endDate: new Date('2025-12-19T14:45:00'),
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
			startDate: new Date('2025-12-20T08:30:00'),
			endDate: new Date('2025-12-20T09:00:00'),
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
			startDate: new Date('2025-12-20T15:00:00'),
			endDate: new Date('2025-12-20T16:00:00'),
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
			startDate: new Date('2025-12-23T11:00:00'),
			endDate: new Date('2025-12-23T11:30:00'),
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
			startDate: new Date('2025-12-24T07:00:00'),
			endDate: new Date('2025-12-24T07:15:00'),
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

	launchView = false
	launchForm = false
	dateToCreate: Date | null = null

	launchViewDetail(appointment: Appointment) {
		this.appointmentSelected = appointment
		this.launchView = true
	}

	closeView() {
		this.launchView = false
		this.appointmentSelected = null
	}

	closeForm() {
		this.launchForm = false
		this.appointmentSelected = null
	}

	updateAppointment(event: Appointment) {
		this.appointments = this.appointments.map(appointment => {
			if (appointment.id === event.id) {
				return event
			}
			return appointment
		})
		this.appointmentSelected = event
		this.launchView = true
	}
	createAppointment(date: Date) {
		this.dateToCreate = date
		this.launchForm = true
	}
}
