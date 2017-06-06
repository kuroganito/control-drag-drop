import { ConfigDash } from './Config'

export class TextDash {

    static getId() {
        return 'addText'
    };

    static controlProperties() {
        return [
            { label: 'Nombre', name: 'name' },
            { label: 'Topico', name: 'topic' },
        ];
    }


    static getLayout() {
        return `              
            <div class="col col-6">
                <div class="box">
                    <div class="form-group">
                        <label for="textEx">Texto</label>
                        <button type="button" id="${TextDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                        <div class="mt-1">
                            <div class="input-group">
                                <input disabled type="text" class="form-control">
                                <span class="input-group-btn">
                            <button disabled class="btn btn-sm btn-secondary" type="button">Enviar</button>
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }


    static addControlEvent(callback) {
        $(`#${TextDash.getId()}`).click(function () {
            TextDash.addControl(null, callback);
        })
    }
    static updateControl(control) {
        console.log(control)
        $(`#control-id-${control.id} .box-label`).html(control.name)
        $(`#control-id-${control.id} .text-control`).data('topic',control.topic)
    }
    static addControl(control, callback) {
        var close = false;
        if (!control) {
            control = {
                id: ConfigDash.getGuid(),
                type: 'text',
                class: ConfigDash.controlersClass().indexOf(TextDash),
                name: 'Texto',
                topic: '/topic',
                x: 0,
                y: 0,
                h: 1,
                w: 2,
            }

            close = true;
        }
        $('.gridster ul').gridster().data('gridster').
            add_widget(`<li id="control-id-${control.id}">
            <div class="box">
                <button data-id="${control.id}" type="button" class="btn btn-sm float-right btn-outline-primary btn-control-delete"
                data-toggle="modal" data-target="#deleteControlModal"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button data-id="${control.id}" type="button" class="btn btn-sm float-right btn-outline-primary btn-control-edit"
                data-toggle="modal" data-target="#editControlModal"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <div class="form-group">
                    <label class="box-label for="textEx">${control.name}</label>
                    <div class="">
                    <div class="input-group text-container">
                    <textarea style="overflow:auto;resize:none" data-topic="${control.topic}" type="text" class="form-control grid-control text-control"></textarea>
                    <span class="input-group-btn">
                    <button  
                    class="btn btn-sm btn-primary grid-control text-submit-control" type="button">Enviar</button>
                    </span>
                </div>
                </div>
                </div>
                </div>
            </li>`, control.w, control.h, control.x, control.y);

        $(`#control-id-${control.id} .text-submit-control`).click(() => {
            ////////////////////// Enviar a cloudino
            var text = $(`#control-id-${control.id} .text-control`);
            console.log('Enviando a cloudino.io')
            console.log('Topic: ', text.data('topic'))
            console.log('Mensaje: ', text.val())
        })
        if (close) {
            $('#addControlModal').modal('hide')
            callback(control, true)
        }
    }
}