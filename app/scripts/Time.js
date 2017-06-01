import {ConfigDash} from './Config'

export class TimeDash {
    static getId() {
        return 'addTime'
    };

    static controlProperties(){
        return  [
            { label: 'Nombre', name: 'name' },
            { label: 'Topico', name: 'topic' },
        ];
    }

    static getLayout() {
        return `              
            <div class="col col-6 ">
                <div class="box">
                    <label for="buttonEx">Hora</label>
                    <button type="button" id="${TimeDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                    <div class="mt-1">
                        <input disabled type="time"/>
                    </div>
                </div>
            </div>`;
    }

    static addControlEvent(callback) {
        $(`#${TimeDash.getId()}`).click(function () {
            TimeDash.addControl(null, callback);
        })
    }

    static addControl(control, callback) {
        var close = false;
        if (!control) {
            control = {
                id: ConfigDash.getGuid(),
                type: 'time',
                class: ConfigDash.controlersClass().indexOf(TimeDash),
                name: 'Hora',
                topic: '/topic',
                x: 0,
                y: 0,
                h: 1,
                w: 2
            }
            close = true;
        }
        $('.gridster ul').gridster().data('gridster').
        add_widget(`
        <li id="control-id-${control.id}">
            <div class="box">
                <button data-id="${control.id}" type="button"  
                class="btn btn-sm float-right btn-outline-primary btn-control-delete" 
                data-toggle="modal" data-target="#deleteControlModal">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button data-id="${control.id}" type="button"  
                class="btn btn-sm float-right btn-outline-primary btn-control-edit" 
                data-toggle="modal" data-target="#editControlModal">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <label class="box-label">${control.name}</label>
                 <div class="date-content">
                    <input  class="" data-topic="${control.topic}"  type="time"/>
                 </div>   
            </div>
        </li>`, control.w, control.h, control.x, control.y)
        if (close) {
            $('#addControlModal').modal('hide')
            callback(control,true)
        }
    }
}