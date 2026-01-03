import { BaseModel } from './common/base.model'

export class MedicalMetrics extends BaseModel {
	weight!: number
	temperature!: number
	arterialPressure!: string
	height!: number
	heartRate!: number
	patientId!: string

	constructor(data: Partial<MedicalMetrics>) {
		super(data)
		Object.assign(this, data)
	}
	get bodySurface(): number {
		const a = 0.007184
		const b = 0.425
		const c = 0.725
		return a * Math.pow(this.height, b) * Math.pow(this.weight, c)
	}
}
