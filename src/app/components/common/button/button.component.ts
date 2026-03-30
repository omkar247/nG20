import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() buttonText = '';
  @Input() iconClass = '';

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit();
    }
  }

  get buttonClasses(): string {
    const classes = [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`
    ];

    if (this.disabled) {
      classes.push('btn-disabled');
    }

    if (this.loading) {
      classes.push('btn-loading');
    }

    if (this.fullWidth) {
      classes.push('btn-full-width');
    }

    return classes.join(' ');
  }

  get displayText(): string {
    if (this.loading) {
      return this.buttonText ? `${this.buttonText}...` : 'Loading...';
    }
    return this.buttonText;
  }
}
