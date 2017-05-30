import {ConfigDash} from './Config'

export class ButtonDash {
    static getId() {
        return "addButton"
    };

    static getLayout() {
        return `              
            <div class="col col-6 ">
                <div class="box">
                    <label for="buttonEx">Boton</label>
                    <button type="button" id="${ButtonDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                    <div class="mt-1">
                        <button disabled id="buttonEx" type="button" class="btn btn-primary btn-block">Enviar</button>
                    </div>
                </div>
            </div>`;
    }

    static addControlEvent(callback) {
        $(`#${ButtonDash.getId()}`).click(function () {
            ButtonDash.addControl(null, callback);
        })
    }

    static addControl(control, callback) {
        var close = false;
        if (!control) {
            control = {
                id: ConfigDash.getGuid(),
                type: "button",
                name: "Boton",
                topic: "/topic",
                x: 0,
                y: 0,
                h: 1,
                w: 2,
                msg: "on"
            }
            close = true;
        }
        $(".gridster ul").gridster().data('gridster').
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
                <button data-topic="${control.topic}" data-msg="${control.msg}" id="buttonEx" 
                type="button" class="btn btn-primary btn-block grid-control">Enviar</button>
            </div>
        </li>`, control.w, control.h, control.x, control.y)
        if (close) {
            $('#addControlModal').modal('hide')
            
            $(`#control-id-${control.id}  .btn-control-edit`).trigger("click")
            callback(control)
        }
    }
}