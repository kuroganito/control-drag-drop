import {ConfigDash} from './Config'

export class DateDash {
    static getId() {
        return 'addDate'
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
                    <label for="buttonEx">Fecha</label>
                    <button type="button" id="${DateDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                    <div class="mt-1">
                        <input disabled type="date"/>
                    </div>
                </div>
            </div>`;
    }

    static addControlEvent(callback) {
        $(`#${DateDash.getId()}`).click(function () {
            DateDash.addControl(null, callback);
        })
    }
    static updateControl(control) {
        console.log(control)
        /*$(`#control-id-${control.id} .box-label`).html(control.name)
        $(`#control-id-${control.id} .button-control`).data("topic",control.topic)
        $(`#control-id-${control.id} .button-control`).data("msg",control.msg)*/
    }

    static addControl(control, callback) {
        var close = false;
        if (!control) {
            control = {
                id: ConfigDash.getGuid(),
                type: 'date',
                class: ConfigDash.controlersClass().indexOf(DateDash),
                name: 'Fecha',
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
                    <input  class="" data-topic="${control.topic}"  type="date"/>
                 </div>   
            </div>
        </li>`, control.w, control.h, control.x, control.y)
        if (close) {
            $('#addControlModal').modal('hide')
            callback(control,true)
        }
    }
}