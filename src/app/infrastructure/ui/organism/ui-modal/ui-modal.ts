import { Component, input, output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiIcon } from '@infra/ui/atoms'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

@Component({
	selector: 'app-ui-modal',
	imports: [CommonModule, UiIcon],
	templateUrl: './ui-modal.html',
	styles: ``,
})
export class UiModal {
	// inputs
	title = input<string>('')
	size = input<ModalSize>('md')
	showCloseButton = input<boolean>(true)
	showHeader = input<boolean>(true)
	showFooter = input<boolean>(true)
	isOpen = input<boolean>(false)

	// outputs
	closeModal = output<void>()

	// Computed property for modal size classes
	get sizeClasses(): string {
		const sizes: Record<ModalSize, string> = {
			sm: 'max-w-sm',
			md: 'max-w-md',
			lg: 'max-w-lg',
			xl: 'max-w-xl',
			'2xl': 'max-w-2xl',
		}
		return sizes[this.size()]
	}

	onClose(): void {
		this.closeModal.emit()
	}

	onBackdropClick(event: MouseEvent): void {
		if (event.target === event.currentTarget) {
			this.onClose()
		}
	}
}
