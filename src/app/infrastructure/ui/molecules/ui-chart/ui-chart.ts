import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	ViewChild,
	effect,
} from '@angular/core'
import {
	BarController,
	BarElement,
	CategoryScale,
	Chart,
	ChartConfiguration,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	PieController,
	PointElement,
	Title,
	Tooltip,
	ArcElement,
} from 'chart.js'

import { ChartData, ChartOptions, ChartType } from './chart.type'

// Registrar componentes de Chart.js
Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	LineController,
	BarController,
	PieController,
)

@Component({
	selector: 'app-ui-chart',
	imports: [],
	templateUrl: './ui-chart.html',
})
export class UiChart implements AfterViewInit, OnDestroy {
	@ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>

	@Input({ required: true }) type: ChartType = 'line'
	@Input({ required: true }) data!: ChartData
	@Input() options: ChartOptions = {}
	@Input() height = '300px'

	private chart?: Chart

	constructor() {
		// Efecto para actualizar el chart cuando cambien los datos
		effect(() => {
			if (this.chart && this.data) {
				this.updateChart()
			}
		})
	}

	ngAfterViewInit(): void {
		this.createChart()
	}

	ngOnDestroy(): void {
		if (this.chart) {
			this.chart.destroy()
		}
	}

	private createChart(): void {
		if (!this.chartCanvas || !this.data) return

		const ctx = this.chartCanvas.nativeElement.getContext('2d')
		if (!ctx) return

		const defaultOptions: ChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: true,
					position: 'top',
				},
			},
			...(this.type !== 'pie' && {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			}),
		}

		const config: ChartConfiguration = {
			type: this.type,
			data: this.data,
			options: { ...defaultOptions, ...this.options },
		}

		this.chart = new Chart(ctx, config)
	}

	private updateChart(): void {
		if (!this.chart) return

		this.chart.data = this.data
		this.chart.update()
	}
}
