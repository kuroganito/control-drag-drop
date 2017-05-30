import { ButtonDash} from './Button';
import { TextDash } from './Text';

export class ConfigDash{

    static controlersClass(){
        return [ButtonDash,TextDash] 
    }

    static controlProperties(){
        return  [{ label: 'Nombre', name: 'name' }];
    }

    static getGuid() {
        function s4() {
            return Math.floor( (1 + Math.random()) * 100000 )
        }
        return s4() + s4();
    }
}