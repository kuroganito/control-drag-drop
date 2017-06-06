import { ConfigDash } from './Config'

export class ToggleDash {
    static getId() {
        return 'addToggle'
    };

    static controlProperties() {
        return [
            { label: 'Nombre', name: 'name' },
            { label: 'Topico', name: 'topic' },
            { label: 'Mensaje activo', name: 'msgOn' },
            { label: 'Mensaje inactivo', name: 'msgOff' },
        ];
    }

    static getLayout() {
        return `              
            <div class="col col-6 ">
                <div class="box">
                    <label for="${ToggleDash.getId()}">Interruptor</label>
                    <button type="button" id="${ToggleDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                    <div class="mt-1">
                        <label class="switch">
                            <input disabled type="checkbox">
                            <div class="slider round"></div>
                        </label>
                    </div>
                </div>
            </div>`;
    }

    static addControlEvent(callback) {
        $(`#${ToggleDash.getId()}`).click(function () {
            ToggleDash.addControl(null, callback);
        })
    }
    static updateControl(control) {
        console.log(control)
        $(`#control-id-${control.id} .box-label`).html(control.name)
        $(`#control-id-${control.id} .toggle-control`).data('topic', control.topic)
        $(`#control-id-${control.id} .toggle-control`).data('msgon', control.msgOn)
        $(`#control-id-${control.id} .toggle-control`).data('msgoff', control.msgOff)
    }
    static addControl(control, callback) {
        var close = false;
        console.log()
        if (!control) {
            control = {
                id: ConfigDash.getGuid(),
                type: 'toggle',
                class: ConfigDash.controlersClass().indexOf(ToggleDash),
                name: 'Interruptor',
                topic: '/topic',
                x: 0,
                y: 0,
                h: 1,
                w: 2,
                msgOn: 'on',
                msgOff: 'off'
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
                <label class="switch">
                    <input  ${close ? 'disabled' : ''} class="toggle-control grid-control" 
                    data-topic="${control.topic}" data-msgon="${control.msgOn}" data-msgoff="${control.msgOff}"  type="checkbox">
                    <div class="slider round"></div>
                </label>
            </div>
        </li>`, control.w, control.h, control.x, control.y)
        $(`#control-id-${control.id} .toggle-control`).change(() => {
            var toggle = $(`#control-id-${control.id} .toggle-control`);
            ////////////////////// Enviar a cloudino change
            console.log('Enviando a cloudino.io')
            console.log('Topic: ', toggle.data('topic'))
            if (toggle.is(':checked')) {
                console.log('Mensaje: ', toggle.data('msgon'))
            } else {
                console.log('Mensaje: ', toggle.data('msgoff'))
            }
        })
        if (close) {
            $('#addControlModal').modal('hide')
            callback(control, true)
        }
    }
}