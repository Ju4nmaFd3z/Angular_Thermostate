import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-control-temperature',
  imports: [],
  templateUrl: './control-temperature.component.html',
  styleUrl: './control-temperature.component.css'
})
export class ControlTemperatureComponent {

  // Inputs y outputs

  temperature = input.required<number>();
  umbralMax = input.required<number>();
  umbralMin = input.required<number>();
  temperatureOutput = output<number>();
  umbralMaxOutput = output<number>();
  umbralMinOutput = output<number>();

  // Propiedades y variables

  tempUpdate?: number;

  // Enventos y listeners

  onClickIncTemp() {
    this.tempUpdate = this.temperature() + 1;
    this.temperatureOutput.emit(this.tempUpdate);
  }

  onClickDecTemp() {
    this.tempUpdate = this.temperature() - 1;
    this.temperatureOutput.emit(this.tempUpdate);
  }

  onClickIncUmbralMax() {
    this.umbralMaxOutput.emit(this.umbralMax() + 1);
  }

  onClickDecUmbralMax() {
    this.umbralMaxOutput.emit(this.umbralMax() - 1);
  }

  onClickIncUmbralMin() {
    this.umbralMinOutput.emit(this.umbralMin() + 1);
  }

  onClickDecUmbralMin() {
    this.umbralMinOutput.emit(this.umbralMin() - 1);
  }

  onInput(event: Event) {
    // event.target es de tipo EventTarget | null, y TypeScript no sabe que es un <input>,
    // así que no nos deja acceder a .value. "as HTMLInputElement" es una conversión de tipo
    // (type assertion): solo le dice al compilador qué tipo de elemento es para poder usar
    // .value. No cambia nada en tiempo de ejecución ni comprueba que sea realmente un <input>.
    let inputElement = event.target as HTMLInputElement;

    // Diferencia entre (input) y (change):
    // - (input) se dispara en cada modificación del valor, es decir, con cada tecla pulsada.
    // - (change) solo se dispara cuando el usuario confirma el valor (al perder el foco o
    //   pulsar Enter), no mientras escribe.

    // Si el valor no es un número, Number() no lanza ningún error: devuelve NaN
    // (y Number('') devuelve 0). Con NaN el umbral dejaría de funcionar, porque
    // cualquier comparación con NaN es false. Para evitarlo se valida el valor y,
    // si no es válido, se lanza un error que captura el catch, que restaura el
    // último umbral válido en el campo sin modificar el umbral de alarma.

    if (inputElement.id === 'umbralMax') {
      try {
        if (inputElement.value.trim() === '' || Number.isNaN(Number(inputElement.value))) {
          throw new Error('El umbral máximo no es un número válido: ' + inputElement.value);
        }
        let umbralMax = Number(inputElement.value);
        console.log('Se establece nuevo umbral máximo de temperatura: ' + umbralMax);
        this.umbralMaxOutput.emit(umbralMax);
      } catch (error) {
        console.error(error);
        inputElement.value = this.umbralMax().toString();
      }
    } else if (inputElement.id === 'umbralMin') {
      try {
        if (inputElement.value.trim() === '' || Number.isNaN(Number(inputElement.value))) {
          throw new Error('El umbral mínimo no es un número válido: ' + inputElement.value);
        }
        let umbralMin = Number(inputElement.value);
        console.log('Se establece nuevo umbral mínimo de temperatura: ' + umbralMin);
        this.umbralMinOutput.emit(umbralMin);
      } catch (error) {
        console.error(error);
        inputElement.value = this.umbralMin().toString();
      }
    }
  }

}
