import { Component } from '@angular/core';
import { ControlTemperatureComponent } from './components/control-temperature/control-temperature.component';
import { DisplayThermostateComponent } from './components/display-thermostate/display-thermostate.component';

@Component({
  selector: 'app-root',
  imports: [ControlTemperatureComponent, DisplayThermostateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Propiedades y variables

  title = 'Termostato';
  temperature = 20; // Temperatura inicial
  umbralMax = 25; // Umbral máximo inicial
  umbralMin = 15; // Umbral mínimo inicial

  // Enventos y listeners

  onTemperatureChange(tempUpdate: number) {
    this.temperature = tempUpdate;
  }

  onUmbralMaxChange(umbralMaxUpdate: number) {
    this.umbralMax = umbralMaxUpdate;
  }

  onUmbralMinChange(umbralMinUpdate: number) {
    this.umbralMin = umbralMinUpdate;
  }
}
