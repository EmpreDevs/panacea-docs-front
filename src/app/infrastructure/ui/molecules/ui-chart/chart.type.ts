export type ChartType = 'line' | 'bar' | 'pie'

export interface ChartDataset {
	label: string
	data: number[]
	backgroundColor?: string | string[]
	borderColor?: string | string[]
	borderWidth?: number
	fill?: boolean
	tension?: number
}

export interface ChartData {
	labels: string[]
	datasets: ChartDataset[]
}

export interface ChartOptions {
	responsive?: boolean
	maintainAspectRatio?: boolean
	plugins?: {
		legend?: {
			display?: boolean
			position?: 'top' | 'bottom' | 'left' | 'right'
		}
		title?: {
			display?: boolean
			text?: string
		}
	}
	scales?: {
		y?: {
			beginAtZero?: boolean
		}
	}
}
