import { Component, computed, inject, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { getAppPath } from '@app/helpers/route-builder'
import { ScreenSizeService } from '@app/services'
import { APP_ROUTES } from '@shared/constants'

import { Note } from '@domain/models/notes.model'

import { NoteDetail, NoteTable } from '@infra/features/notes'
import { NotesFacade } from '@infra/store/facades'
import { UiCard, UiH2, UiIcon, UiLink } from '@infra/ui/atoms'

@Component({
	selector: 'app-patient-note-list-page',
	imports: [UiH2, UiCard, NoteTable, UiIcon, UiLink, NoteDetail],
	templateUrl: './patient-note-list-page.html',
	styles: ``,
})
export class PatientNoteListPage {
	                                        route = inject(ActivatedRoute)               
	screenSize = inject(ScreenSizeService)
	noteFacade = inject(NotesFacade)

	patientId = computed(() => this.route.parent?.snapshot.paramMap.get('id') || '');


	previewNote = signal<Note | null>(null)
	isMobile = computed(() => this.screenSize.isMobile)

	linkDetailNote: string[] = []
	linkNote = (noteId: string, appointmentId: string) => {
		return [getAppPath(APP_ROUTES.patients.root, APP_ROUTES.patients.notesDetail(this.patientId(), noteId, appointmentId))]
	}
	notes = [
		new Note({
			id: '1',
			type: 'Consulta',
			date: new Date(),
			content: `<div class="nota-medica">
    <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-bottom: 20px;">NOTA MÉDICA - CONSULTA EXTERNA</h1>
    
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #3498db;">
        <h2 style="color: #2c3e50; margin-top: 0;">Información del Paciente</h2>
        <p><strong style="color: #2c3e50;">Nombre:</strong> María González Rodríguez</p>
        <p><strong style="color: #2c3e50;">Edad:</strong> 45 años</p>
        <p><strong style="color: #2c3e50;">Sexo:</strong> Femenino</p>
        <p><strong style="color: #2c3e50;">Expediente:</strong> MGR-2023-04567</p>
        <p><strong style="color: #2c3e50;">Fecha de consulta:</strong> 15 de marzo de 2024</p>
    </div>
    
    <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Motivo de Consulta</h2>
    <p style="margin-bottom: 20px;">Paciente refiere <strong>cefalea intensa</strong> de 3 días de evolución, asociada a náuseas y fotofobia. No presenta fiebre ni alteraciones visuales.</p>
    
    <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Antecedentes</h2>
    <ul style="margin-bottom: 20px; padding-left: 20px;">
        <li><strong>Personales:</strong> Hipertensión arterial controlada desde hace 5 años</li>
        <li><strong>Familiares:</strong> Padre con diabetes tipo 2</li>
        <li><strong>Quirúrgicos:</strong> Apendicectomía (2010)</li>
        <li><strong>Alérgicos:</strong> No refiere alergias conocidas</li>
    </ul>
    
    <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Exploración Física</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
            <tr style="background-color: #3498db; color: white;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Parámetro</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Valor</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Observaciones</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background-color: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #ddd;">Presión arterial</td>
                <td style="padding: 10px; border: 1px solid #ddd;">130/85 mmHg</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Dentro de parámetros normales</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Frecuencia cardíaca</td>
                <td style="padding: 10px; border: 1px solid #ddd;">78 lpm</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Rítmica</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #ddd;">Temperatura</td>
                <td style="padding: 10px; border: 1px solid #ddd;">36.8°C</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Afebril</td>
            </tr>
        </tbody>
    </table>
    
    <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Diagnóstico</h2>
    <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin-bottom: 20px;">
        <p><strong>CIE-10:</strong> G43.909 - Migraña sin aura, no intratable, sin estado migrañoso</p>
        <p><strong>Diagnóstico principal:</strong> Cefalea tipo migraña</p>
    </div>
    
    <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Tratamiento</h2>
    <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h3 style="color: #2c3e50; margin-top: 0;">Farmacológico</h3>
        <ol style="padding-left: 20px;">
            <li><strong>Ibuprofeno 400mg:</strong> 1 tableta cada 8 horas por 3 días (durante el dolor)</li>
            <li><strong>Sumatriptán 50mg:</strong> 1 tableta al inicio de la crisis migrañosa</li>
            <li><strong>Metoclopramida 10mg:</strong> 1 tableta cada 8 horas si hay náuseas</li>
        </ol>
        
        <h3 style="color: #2c3e50;">Recomendaciones</h3>
        <ul style="padding-left: 20px;">
            <li>Reposo en habitación oscura durante las crisis</li>
            <li>Evitar desencadenantes: chocolate, vino tinto, quesos maduros</li>
            <li>Mantener hidratación adecuada (2L de agua diarios)</li>
            <li>Registrar frecuencia e intensidad de las crisis en diario de migraña</li>
        </ul>
    </div>
    
    <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Estudios Solicitados</h2>
    <ul style="margin-bottom: 20px; padding-left: 20px;">
        <li>Biometría hemática completa</li>
        <li>Química sanguínea de 24 elementos</li>
        <li><del>Tomografía axial computarizada</del> <span style="color: #6c757d; font-style: italic;">(no aplica por el momento)</span></li>
    </ul>
    
    <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Pronóstico</h2>
    <p style="margin-bottom: 20px;">El pronóstico es <mark style="background-color: #d4edda; padding: 2px 5px;">favorable</mark> con el tratamiento indicado y seguimiento adecuado. Se espera mejoría significativa en 48-72 horas.</p>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #dee2e6; text-align: center;">
        <p><strong>Dr. Alejandro Mendoza Ruiz</strong></p>
        <p style="color: #6c757d;">Médico Especialista en Neurología</p>
        <p style="color: #6c757d;">Cédula Profesional: 12345678</p>
        <p style="margin-top: 20px;"><em>Firma digital:</em> <code style="background-color: #f8f9fa; padding: 2px 5px; border-radius: 3px;">AMR-NM-20240315-001</code></p>
    </div>
    
    <div style="margin-top: 30px; font-size: 12px; color: #6c757d; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
        <p>Documento generado electrónicamente - Tiene validez legal</p>
        <p>Clínica Médica Ejemplo S.A. de C.V. • Av. Siempre Viva 123, Ciudad</p>
        <p>Teléfono: 555-123-4567 • www.clinicamedicaejemplo.com</p>
    </div>
</div>`,
		}),
	]

	noteSelected(note: Note) {
		this.linkDetailNote = [getAppPath(APP_ROUTES.patients.root, APP_ROUTES.patients.notesDetail(this.patientId(), note.id, note.appointmentId))]
		this.previewNote.set(note)
	}
}
