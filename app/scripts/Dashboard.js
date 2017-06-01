
import {ConfigDash} from './Config';


export class Dashboard {

    constructor() {
        console.log('Init Dashboard');
        this.data = [];
        this.loadLayout();
        $('.gridster ul').gridster({
            widget_base_dimensions: ['auto', 80],
            min_cols: 1,
            max_cols: 6,
            min_rows: 20,
            widget_margins: [10, 10],
            shift_widgets_up: false,
            shift_larger_widgets_down: false,
            resize: {
                enabled: true,
                //max_size: [6, 2],
                stop:  (event, ui)=> {
                    this.updateSizePotition();
                }
            },
            collision: {
                wait_for_mouseup: true
            },
            draggable: {
                stop:  (event, ui)=> {
                    this.updateSizePotition();
                }
            }
        });
        this.loadComponents();

    }

     queryComponents(callback) {
        // Dummy local storage
        if (localStorage.getItem('cloudino-controls-data')) {
            this.data = JSON.parse(localStorage.getItem('cloudino-controls-data'));
        } else {
            this.data = [];
        }
        callback();
    }

    updateSizePotition(){
        var grid = $('.gridster ul').gridster().data('gridster').serialize();
        for (var c in grid) {
            this.data[c].x = grid[c].col;
            this.data[c].y = grid[c].row;
            this.data[c].h = grid[c].size_y;
            this.data[c].w = grid[c].size_x;
        }
    }

    loadLayout() {
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

    loadComponents(){
        $('.gridster ul').gridster().data('gridster').disable().disable_resize();
        this.queryComponents( ()=> {
            this.loadSavedControls()
        })
        this.modalAdd();
        this.modalEdit();
        this.modalDelete();

        $('#buttonSave').hide();
        $('#buttonAdd').hide();
        $('.btn-control-edit').hide();
        $('.btn-control-delete').hide();

        $('#buttonEdit').click(()=>{this.editMode()})
        $('#buttonSave').click(()=>{this.viewMode()})
        
        ConfigDash.controlersClass().forEach((c)=>{
            c.addControlEvent((control,edit)=>{
            this.data.push(control);
            console.log(control)
            console.og
            console.log(control)
            if (edit)           
                $(`#control-id-${control.id}  .btn-control-edit`).trigger('click');
            this.updateSizePotition();
           });
        }) 

        //Abrir Elimina modal 
        $('#deleteControlModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget)
            var id = button.data('id')
            var modal = $(this)
            console.log(id)
            $('#delete-control-ok').data('id', id)
        })

        //Eliminado :se borra el control de data y de la vista
        $('#delete-control-ok').click(()=> {
            $('.gridster ul').gridster().data('gridster').
            remove_widget($(`#control-id-${$('#delete-control-ok').data('id')}`), true)
            console.log($(`#control-id-${$('#delete-control-ok').data('id')}`))
            this.data.splice(this.searchControl($(this).data('id')), 1);
            this.updateSizePotition();
            $('#deleteControlModal').modal('hide')
        })

        //Abrir edita modal
        $('#editControlModal').on('show.bs.modal', (event)=> {
            var button = $(event.relatedTarget)
            var id = button.data('id')
            var control =  this.searchControl(id);
            ConfigDash.controlersClass()[control.class].controlProperties().forEach((d)=>{
                $(`#control-data-${d.name}`).val(control[d.name])
                $(`#control-data-${d.name}`).parent().removeClass('hidden-xs-up');
            })
            $('#edit-control-ok').data('id', id)
        })
        //Guardar datos de edicion
        $('#edit-control-ok').click( ()=> {
            var control =  this.searchControl($('#edit-control-ok').data('id'));
            ConfigDash.controlersClass()[control.class].controlProperties().forEach((d)=>{
                control[d.name] = $(`#control-data-${d.name}`).val()
            })
            this.updateSizePotition();
            $('#editControlModal').modal('hide')
        })
        //Oculta todos los controles
        $('#editControlModal').on('hidden.bs.modal', function (event) {
            ConfigDash.controlProperties().forEach((d)=>{
                $(`#control-data-${d.name}`).parent().addClass('hidden-xs-up');
            })
        })

        $('.ghost-grid').hide();
        for (var i = 0; i < 90; i++) {
            $('.ghost-grid').append('<div class="col col-2">' +
                '<div class="ghost-rec"></div>' +
                '</div>');
        }

    }

    loadSavedControls(){
        this.data.forEach((d)=>{
            ConfigDash.controlersClass()[d.class].addControl(d,()=>{

            })
        })
    }

     searchControl(idSearch) {
        return this.data.find(  (d)=> {
            return d.id == idSearch;
        });
    }

    editMode(){
        $('#buttonEdit').hide();
        $('#buttonSave').show();
        $('#buttonAdd').show();
        $('.btn-control-edit').show();
        $('.btn-control-delete').show();

        $('.controls').slideDown();
        $('.gridster ul').gridster().data('gridster').enable().enable_resize();
        $('.ghost-grid').show();
        $('.control-panel').removeClass('back-trans');
        $('.grid-control').css('opacity', .3)
        $('.gridster .box').css('cursor', 'move')
    }

    viewMode(){
        $('#buttonEdit').show();
        $('#buttonSave').hide();
        $('#buttonAdd').hide();
        $('.btn-control-edit').hide();
        $('.btn-control-delete').hide();
        $('.controls').slideUp();
        $('.gridster ul').gridster().data('gridster').disable().disable_resize();
        $('.ghost-grid').hide();
        $('.control-panel').addClass('back-trans');
        $('.grid-control').css('opacity', 1)
        $('.gridster .box').css('cursor', 'default')
        //Guardar cambios
        this.updateComponent();
    }

    updateComponent() {
        // Dummy local storage
        localStorage.setItem('cloudino-controls-data', JSON.stringify(this.data));
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
        ConfigDash.controlProperties().forEach((p)=>{
            text +=`<div class="form-group hidden-xs-up">
                        <label for="control-data-${p.name}">${p.label}:</label>
                        <input type="text" class="form-control" id="control-data-${p.name}" >
                    </div>`
        })
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

    modalDelete(){
        $('body').append(`    
        <div id="deleteControlModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteControlModal" aria-hidden="true">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        ¿Estas seguro de eliminar este control?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button id="delete-control-ok" type="button" class="btn btn-primary">Eliminar</button>
                    </div>
                </div>

            </div>
        </div>`);
    }

    modalAdd(){      
        var text = 
        `<div class="modal fade" id="addControlModal" tabindex="-1" role="dialog" aria-labelledby="addControlModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Agrega control</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="controls row">`
        ConfigDash.controlersClass().forEach((c)=>{
           text+= c.getLayout();
        })
        text+=
                        `</div>
                    </div>
                </div>
            </div>
        </div>`
        $('body').append(text);
    }

}
