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
}
