# Common Components

This directory contains reusable UI components that can be used throughout the application.

## Components

### ButtonComponent (`<app-button>`)

A flexible button component with multiple variants and states.

#### Usage Examples

```html
<!-- Basic button -->
<app-button buttonText="Click me" (buttonClick)="handleClick()"></app-button>

<!-- With variants -->
<app-button buttonText="Primary" variant="primary"></app-button>
<app-button buttonText="Secondary" variant="secondary"></app-button>
<app-button buttonText="Success" variant="success"></app-button>
<app-button buttonText="Danger" variant="danger"></app-button>

<!-- With sizes -->
<app-button buttonText="Small" size="small"></app-button>
<app-button buttonText="Medium" size="medium"></app-button>
<app-button buttonText="Large" size="large"></app-button>

<!-- With loading state -->
<app-button buttonText="Loading" [loading]="true"></app-button>

<!-- Full width -->
<app-button buttonText="Full Width" fullWidth></app-button>

<!-- With icon -->
<app-button buttonText="With Icon" iconClass="fas fa-save"></app-button>

<!-- Submit button -->
<app-button type="submit" buttonText="Submit" variant="primary"></app-button>
```

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'success'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Show loading state |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `buttonText` | `string` | `''` | Button text |
| `iconClass` | `string` | `''` | CSS class for icon (e.g., FontAwesome) |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `buttonClick` | `void` | Fired when button is clicked |

---

### InputComponent (`<app-input>`)

A flexible input component that implements `ControlValueAccessor` for use with Angular forms.

#### Usage Examples

```html
<!-- Basic input -->
<app-input 
  label="Email" 
  type="email" 
  placeholder="Enter your email"
  [(ngModel)]="email">
</app-input>

<!-- With reactive forms -->
<app-input
  label="Password"
  type="password"
  placeholder="Enter your password"
  [formControl]="form.get('password')"
  [error]="form.get('password')?.touched && form.get('password')?.invalid ? 'Password required' : ''"
  required>
</app-input>

<!-- With icon -->
<app-input
  label="Search"
  type="text"
  placeholder="Search..."
  iconClass="fas fa-search">
</app-input>

<!-- Different sizes -->
<app-input label="Small Input" size="small"></app-input>
<app-input label="Large Input" size="large"></app-input>

<!-- Disabled -->
<app-input label="Disabled" [disabled]="true"></app-input>
```

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel'` | `'text'` | Input type |
| `placeholder` | `string` | `''` | Placeholder text |
| `label` | `string` | `''` | Input label |
| `id` | `string` | `''` | Input ID (auto-generated if not provided) |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disable input |
| `readonly` | `boolean` | `false` | Make input readonly |
| `maxLength` | `number` | `undefined` | Maximum length |
| `minLength` | `number` | `undefined` | Minimum length |
| `pattern` | `string` | `undefined` | Regex pattern |
| `error` | `string` | `''` | Error message to display |
| `showRequiredIndicator` | `boolean` | `true` | Show red asterisk for required fields |
| `autocomplete` | `string` | `'off'` | Autocomplete attribute |
| `iconClass` | `string` | `''` | CSS class for icon |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size |
| `fullWidth` | `boolean` | `true` | Make input full width |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `inputChange` | `string` | Fired when input value changes |
| `inputFocus` | `FocusEvent` | Fired when input gains focus |
| `inputBlur` | `FocusEvent` | Fired when input loses focus |

---

## Importing

You can import components individually or use the barrel export:

```typescript
// Individual imports
import { ButtonComponent } from './common/button/button.component';
import { InputComponent } from './common/input/input.component';

// Barrel export (recommended)
import { ButtonComponent, InputComponent } from './common';
```

## Styling

Both components use SCSS with CSS custom properties for easy theming. The styles are self-contained and won't conflict with other components.

## Accessibility

- Both components follow ARIA guidelines
- Proper focus management
- Keyboard navigation support
- Screen reader friendly labels
