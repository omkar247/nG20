import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' = 'text';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() id = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() pattern?: string;
  @Input() error = '';
  @Input() showRequiredIndicator = true;
  @Input() autocomplete = 'off';
  @Input() iconClass = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() fullWidth = true;
  @Input() formControl?: FormControl;

  @Output() inputChange = new EventEmitter<string>();
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  @Output() inputBlur = new EventEmitter<FocusEvent>();

  value: string = '';
  isFocused = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.inputChange.emit(this.value);
  }

  onFocus(event: FocusEvent): void {
    this.isFocused = true;
    this.onTouched();
    this.inputFocus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.isFocused = false;
    this.inputBlur.emit(event);
  }

  get inputClasses(): string {
    const classes = [
      'input-field'
    ];

    if (this.size) {
      classes.push(`input-${this.size}`);
    }

    if (this.fullWidth) {
      classes.push('input-full-width');
    }

    if (this.disabled) {
      classes.push('input-disabled');
    }

    if (this.error) {
      classes.push('input-error');
    }

    if (this.isFocused) {
      classes.push('input-focused');
    }

    if (this.iconClass) {
      classes.push('input-with-icon');
    }

    return classes.join(' ');
  }

  get containerClasses(): string {
    const classes = [
      'input-container'
    ];

    if (this.fullWidth) {
      classes.push('container-full-width');
    }

    return classes.join(' ');
  }

  get inputId(): string {
    return this.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  }
}
