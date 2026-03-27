import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
   features = signal([
    'Signals - Reactive state management',
    'Zoneless - Better performance',
    'OnPush - Optimized change detection',
    'Standalone Components - No NgModule needed',
    'New Routing Method - Modern navigation',
    'Computed Signals - Derived values'
  ]);

   angularVersion = signal('20.3.0');
}