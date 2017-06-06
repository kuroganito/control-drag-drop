import {ConfigDash} from './Config'

export class ButtonDash {
    static getId() {
        return 'addButton'
    };

    static controlProperties(){
        return  [
            { label: 'Nombre', name: 'name' },
            { label: 'Topico', name: 'topic' },
            { label: 'Mensaje', name: 'msg' }
        ];
    }

    static getLayout() {
        return `              
            <div class="col col-6 ">
                <div class="box">
                    <label for="buttonEx">Boton</label>
                    <button type="button" id="${ButtonDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                    <div class="mt-1">
                        <button disabled="disabled" id="buttonEx" type="button" class="btn btn-primary btn-block">Enviar</button>
                    </div>
                </div>
            </div>`;
    }

    static addControlEvent(callback) {
        $(`#${ButtonDash.getId()}`).click(function () {
            ButtonDash.addControl(null, callback);
        })
    }

    static updateControl(control) {
        console.log(control)
        $(`#control-id-${control.id} .box-label`).html(control.name)
        $(`#control-id-${control.id} .button-control`).data('topic',control.topic)
        $(`#control-id-${control.id} .button-control`).data('msg',control.msg)
    }


    static addControl(control, callback) {
        var close = false;
        console.log()
        if (!control) {
            control = {
                id: ConfigDash.getGuid(),
                type: 'button',
                class: ConfigDash.controlersClass().indexOf(ButtonDash),
                name: 'Boton',
                topic: '/topic',
                x: 0,
                y: 0,
                h: 1,
                w: 2,
                msg: 'on'
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
                <button data-topic="${control.topic}" data-msg="${control.msg}"
                type="button" ${close?'disabled':''} class="btn btn-primary btn-block grid-control button-control">Enviar</button>
            </div>
        </li>`, control.w, control.h, control.x, control.y)

        $(`#control-id-${control.id} .button-control`).mousedown(()=>{
            var button = $(`#control-id-${control.id} .button-control`);
            ////////////////////// Enviar a cloudino mousedown
            console.log('Enviando a cloudino.io')
            console.log('Topic: ', button.data('topic'))
            console.log('Mensaje: ', button.data('msg'))
        })

        $(`#control-id-${control.id} .button-control`).mouseup(()=>{
            var button = $(`#control-id-${control.id} .button-control`);
            ////////////////////// Enviar a cloudino mouseup
            console.log('Enviando a cloudino.io')
            console.log('Topic: ', button.data('topic'))
            console.log('Mensaje: ', 'off')
        })
        


        if (close) {
            $('#addControlModal').modal('hide')
            callback(control,true)
        }
    }
}