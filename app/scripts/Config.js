import { ButtonDash } from './Button';
import { TextDash } from './Text';
import { ToggleDash } from './Toggle';
import { RangeDash } from './Range';
import { DateDash } from './Date';
import { TimeDash } from './Time';
import { LabelDash } from './Label';
import { LinearChartDash } from './LinearChart';
export class ConfigDash {

    static controlersClass() {
        return [ButtonDash, TextDash, ToggleDash, RangeDash,DateDash,TimeDash,LabelDash,LinearChartDash]
    }

    static controlProperties() {
        return [
            { label: 'Nombre', name: 'name' },
            { label: 'Topico', name: 'topic' },
            { label: 'Valores', name: 'values' },
            { label: 'Mensaje', name: 'msg' },
            { label: 'Mensaje activo', name: 'msgOn' },
            { label: 'Mensaje inactivo', name: 'msgOff' },
            { label: 'Valor minimo', name: 'min' },
            { label: 'Valor maximo', name: 'max' },
            { label: 'Incremento', name: 'step' }
        ];
    }


    static getGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 100000)
        }
        return s4() + s4();
    }
}


/*
*** Entrada ***

Text
Button
Toggle
Range
Select
Calendar

*** Salida ***

Badges


*/