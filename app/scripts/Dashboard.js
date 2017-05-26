export class Dashboard {

    //prop;

    constructor() {
        console.log('Init Dashboard');
        this.properties = [{ label: 'Nombre', name: 'name' }]
        this.loadModals();
        this.loadComponents();

    }

    loadModals() {
        this.modalEdit()
    }

    loadComponents() {
        $('.dashboard-cloudino').append(`        
        <div class="options">
            <button id="buttonAdd" type="button" class="btn btn-primary" data-toggle="modal" data-target="#addControlModal">Agregar</button>
            <button id="buttonEdit" type="button" class="btn btn-primary ">Editar</button>
            <button id="buttonSave" type="button" class="btn btn-primary ">Guardar</button>
        </div>
        <div class="gridster">
            <div class="ghost-grid row">
            </div>
            <ul>
            </ul>
        </div>`)
    }

    modalEdit() {
        var text = ` 
            <div id="editControlModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="editControlModal" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editar control</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form action="">`;
        for(var p in this.properties){
            console.log(this.properties)
            console.log(p)
            text +=`<div class="form-group">
                        <label for="control-data-${this.properties[p].name}">${this.properties[p].label}:</label>
                        <input type="text" class="form-control" id="control-data-${this.properties[p].name}" >
                    </div>`
        }
        text +=`</form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button id="edit-control-ok" type="button" class="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>`
        $('body').append(text)
    }


}
