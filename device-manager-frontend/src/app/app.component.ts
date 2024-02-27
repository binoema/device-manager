import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    DevicesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'device-manager-frontend';
}
