import {ConfigDash} from './Config'

export class LabelDash {
    static getId() {
        return 'addLabel'
    };

    static controlProperties(){
        return  [
            { label: 'Nombre', name: 'name' },
            { label: 'Topico', name: 'topic' }
        ];
    }

    static getLayout() {
        return `              
            <div class="col col-6 ">
                <div class="box">
                    <label for="buttonEx">Mensaje</label>
                    <button type="button" id="${LabelDash.getId()}" class="btn btn-sm float-right btn-outline-primary">Agregar</button>
                    <div class="mt-1 text-center"><h3>
                        <span class="badge badge-primary">Hola mundo</span></h3>
                    </div>
                </div>
            </div>`;
    }

    static addControlEvent(callback) {
        $(`#${LabelDash.getId()}`).click(function () {
            LabelDash.addControl(null, callback);
        })
    }

    static addControl(control, callback) {
        var close = false;
        console.log()
        if (!control) {
            control = {
                id: ConfigDash.getGuid(),
                type: 'Label',
                class: ConfigDash.controlersClass().indexOf(LabelDash),
                name: 'Mensaje',
                topic: '/topic',
                x: 0,
                y: 0,
                h: 1,
                w: 2,
                msg: 'on',
                val:'Hola mundo'
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
                <div class="text-center"><h3>
                    <span class="badge badge-primary">${control.val}</span></h3>
                </div>

            </div>
        </li>`, control.w, control.h, control.x, control.y)
        if (close) {
            $('#addControlModal').modal('hide')
            callback(control,true)
        }
    }
}