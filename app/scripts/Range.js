import {ConfigDash} from './Config'

export class RangeDash {
    static getId() {
        return 'addRange'
    };

    static controlProperties(){
        return  [
            { label: 'Nombre', name: 'name' },
            { label: 'Topico', name: 'topic' },
            { label: 'Valor minimo', name: 'min' },
            { label: 'Valor maximo', name: 'max' },
            { label: 'Incremento', name: 'step' }
        ];
    }

    static getLayout() {
        return `              
            <div class="col col-6 ">
                <div class="box">
                    <label for="buttonEx">Rango</label>
                    <button type="button" id="${RangeDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                    <div class="mt-1">
                        <input disabled type="range"/>
                    </div>
                </div>
            </div>`;
    }

    static addControlEvent(callback) {
        $(`#${RangeDash.getId()}`).click(function () {
            RangeDash.addControl(null, callback);
        })
    }
    static updateControl(control) {
        console.log(control)
        $(`#control-id-${control.id} .box-label`).html(control.name)
        $(`#control-id-${control.id} .range-control`).data('topic',control.topic)
        $(`#control-id-${control.id} .range-control`).attr('min',control.min)
        $(`#control-id-${control.id} .range-control`).attr('max',control.max)
        $(`#control-id-${control.id} .range-control`).attr('step',control.step)
    }
    static addControl(control, callback) {
        var close = false;
        if (!control) {
            control = {
                id: ConfigDash.getGuid(),
                type: 'range',
                class: ConfigDash.controlersClass().indexOf(RangeDash),
                name: 'Rango',
                topic: '/topic',
                x: 0,
                y: 0,
                h: 1,
                w: 2,
                min: 1,
                max:10,
                step:1
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
                <input ${close ? 'disabled' : ''} class="grid-control range-control"
                 data-topic="${control.topic}"  min="${control.min}" max="${control.max}" step="${control.step}" type="range"/>
                <span class="range-value"></span>
            </div>
        </li>`, control.w, control.h, control.x, control.y)
        $(`#control-id-${control.id} .range-value`).html($(`#control-id-${control.id} .range-control`).val())
        $(`#control-id-${control.id} .range-control`).on('input', () => {
            var range = $(`#control-id-${control.id} .range-control`);
            $(`#control-id-${control.id} .range-value`).show().html(range.val()).delay(6000).fadeOut()
            //$(`#control-id-${control.id} .range-value`)
            ////////////////////// Enviar a cloudino change
            console.log('Enviando a cloudino.io')
            console.log('Topic: ', range.data('topic'))
            console.log('Mensaje: ', range.val())
        })
        if (close) {
            $('#addControlModal').modal('hide')
            callback(control,true)
        }
    }
}